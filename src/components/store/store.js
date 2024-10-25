const regex = /^(.*?)(_eq|_ne|_lt|_gt|_lte|_gte|_like)?$/i;

/**
 * Kelas Store mengelola dokumen dengan menyediakan berbagai metode
 * untuk menambahkan, menghapus, mencari, memfilter, mengurutkan, dan
 * melakukan paginasi dokumen.
 */
class Store {
    constructor() {
        this.docs = [];
        this.indexes = {};
    }

    /**
     * Mengambil nilai dari objek berdasarkan jalur yang diberikan.
     *
     * @param {Object} obj - Objek tempat nilai akan diambil.
     * @param {string} path - Jalur properti dalam format string.
     * @returns {any} Nilai dari jalur yang diberikan atau undefined jika tidak ada.
     */
    getValue(obj, path) {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    }

    /**
     * Membuat indeks untuk field tertentu dari dokumen yang ada.
     *
     * @param {string} field - Nama field yang akan diindeks.
     */
    createIndex(field) {
        if (!this.indexes[field]) {
            this.indexes[field] = {};
            this.docs.forEach((doc, idx) => {
                const value = this.getValue(doc, field);
                if (value !== undefined) {
                    if (!this.indexes[field][value]) {
                        this.indexes[field][value] = [];
                    }
                    this.indexes[field][value].push(idx);
                }
            });
        }
    }

    /**
     * Memperbarui indeks untuk dokumen yang telah diubah.
     *
     * @param {string} field - Nama field yang diindeks.
     * @param {Object} doc - Dokumen yang diperbarui.
     * @param {number} idx - Indeks dari dokumen dalam array.
     */
    updateIndex(field, doc, idx) {
        const value = this.getValue(doc, field);
        if (value !== undefined) {
            if (!this.indexes[field]) {
                this.indexes[field] = {};
            }
            if (!this.indexes[field][value]) {
                this.indexes[field][value] = [];
            }
            this.indexes[field][value].push(idx);
        }
    }

    /**
     * Menghapus dokumen dari indeks berdasarkan field dan nilai.
     *
     * @param {string} field - Nama field yang diindeks.
     * @param {Object} doc - Dokumen yang dihapus.
     * @param {number} index - Indeks dari dokumen dalam array.
     */
    removeFromIndex(field, doc, index) {
        const value = this.getValue(doc, field);
        if (value !== undefined && this.indexes[field]) {
            const idxArray = this.indexes[field][value];
            if (idxArray) {
                const idxToRemove = idxArray.indexOf(index);
                if (idxToRemove !== -1) {
                    idxArray.splice(idxToRemove, 1);
                }
            }
        }
    }

    /**
     * Mengurutkan dokumen berdasarkan field dan urutan yang ditentukan.
     *
     * @param {Array<Object>} docs - Array dokumen yang akan diurutkan.
     * @param {Array<Array<string>>} sorters - Array pasangan [field, urutan].
     * @returns {Array<Object>} Dokumen yang telah diurutkan.
     */
    sort(docs, sorters) {
        return docs.sort((a, b) => {
            for (const [name, order] of sorters) {
                const aValue = this.getValue(a, name);
                const bValue = this.getValue(b, name);
                if (aValue > bValue) return order === "asc" ? 1 : -1;
                if (aValue < bValue) return order === "asc" ? -1 : 1;
            }
            return 0;
        });
    }

    /**
     * Mencari dokumen berdasarkan query yang diberikan.
     *
     * @param {Array<Object>} docs - Array dokumen yang akan dicari.
     * @param {string} query - String query pencarian.
     * @returns {Array<Object>} Dokumen yang cocok dengan query.
     */
    search(docs, query) {
        const lowerQuery = query.toLowerCase();
        return docs.filter((doc) => Object.values(doc).some((value) => (typeof value === "object" ? JSON.stringify(value).toLowerCase().includes(lowerQuery) : String(value).toLowerCase().includes(lowerQuery))));
    }

    /**
     * Memfilter dokumen berdasarkan filter yang diberikan.
     *
     * @param {Array<Object>} docs - Array dokumen yang akan difilter.
     * @param {Array<Object>} filters - Array objek filter yang berisi field, nilai, dan operator.
     * @returns {Array<Object>} Dokumen yang telah difilter.
     */
    filter(docs, filters) {
        return docs.filter((doc) =>
            filters.every(({ name, value, operator }) => {
                const fieldValue = this.getValue(doc, name);
                switch (operator) {
                    case "_eq":
                        return fieldValue === value;
                    case "_ne":
                        return fieldValue !== value;
                    case "_lt":
                        return fieldValue < value;
                    case "_gt":
                        return fieldValue > value;
                    case "_lte":
                        return fieldValue <= value;
                    case "_gte":
                        return fieldValue >= value;
                    case "_like":
                        return String(fieldValue).includes(value);
                    default:
                        return true;
                }
            }),
        );
    }

    /**
     * Mengambil subset dokumen dalam rentang yang ditentukan.
     *
     * @param {Array<Object>} docs - Array dokumen yang akan diambil.
     * @param {number} start - Indeks awal.
     * @param {number} end - Indeks akhir.
     * @returns {Array<Object>} Subset dokumen dalam rentang yang ditentukan.
     */
    range(docs, start, end) {
        return docs.slice(start, end);
    }

    /**
     * Melakukan paginasi pada dokumen.
     *
     * @param {Array<Object>} docs - Array dokumen yang akan dipaginasi.
     * @param {number} page - Nomor halaman yang diinginkan.
     * @param {number} perPage - Jumlah dokumen per halaman.
     * @returns {Array<Object>} Dokumen dalam halaman yang ditentukan.
     */
    paginate(docs, page, perPage) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return docs.slice(start, end);
    }

    /**
     * Menambahkan dokumen baru ke dalam store.
     *
     * @param {Object} doc - Dokumen yang akan ditambahkan.
     */
    add(doc) {
        this.docs.push(doc);

        for (const field in this.indexes) {
            this.updateIndex(field, doc, this.docs.length - 1);
        }
    }

    /**
     * Menghapus dokumen dari store berdasarkan indeks.
     *
     * @param {number} index - Indeks dari dokumen yang akan dihapus.
     */
    delete(index) {
        const deletedDoc = this.docs[index];
        this.docs.splice(index, 1);

        for (const field in this.indexes) {
            this.removeFromIndex(field, deletedDoc, index);
        }
    }

    /**
     * Mengambil semua dokumen dengan opsi filter, sort, dan pagination.
     *
     * @param {Object} options - Opsi untuk mendapatkan dokumen, termasuk sorting, searching, dan pagination.
     * @returns {Array<Object>} Dokumen yang diambil berdasarkan opsi yang diberikan.
     */
    getAll(options = {}) {
        const { _sort, _order, q, _page, _per_page, _start, _end, ...rest } = options;
        let docs = [...this.docs];

        for (const field in rest) {
            const [, name] = field.match(regex) || [];
            if (name) {
                this.createIndex(name);
            }
        }

        if (_sort && _order) {
            const sortFields = _sort.split(",");
            const sortOrder = _order.split(",");
            const sorters = sortFields.map((name, i) => [name, sortOrder[i]]);
            docs = this.sort(docs, sorters);
        }

        if (q) {
            docs = this.search(docs, q);
        }

        if (Object.keys(rest).length) {
            const filters = Object.entries(rest).map(([key, value]) => {
                const [, name, operator = "_eq"] = key.match(regex);
                return { name, value, operator };
            });
            docs = this.filter(docs, filters);
        }

        if (_start !== undefined && _end !== undefined) {
            docs = this.range(docs, _start, _end);
        } else if (_page !== undefined && _per_page !== undefined) {
            docs = this.paginate(docs, _page, _per_page);
        }

        return docs;
    }
}

export { Store };

// {
//     const store = new Store();

//     for (let i = 0; i < 500000; i++) {
//         store.add({ id: i, company: { name: `Company ${i}` } });
//     }

//     console.time("Search Company");
//     const results = store.getAll({ "company.name_like": "Company 5000" });
//     console.timeEnd("Search Company");

//     console.log(results);
//     // Search Company: 618.3251953125 ms
// }

// {
//     const store = new Store();

//     for (let i = 0; i < 500000; i++) {
//         store.add({ id: i, company: { name: `Company ${i}` } });
//     }

//     console.time("Search Company");
//     const results = store.getAll({ "company.name_like": "Company 5000" });
//     console.timeEnd("Search Company");

//     console.log(results);
//     // Search Company: 563.850830078125 ms
// }
