
export const columns = [
    {
        name: "Title",
        width: "50%",
        selector: (row) => row.apiTitle,
        cell: (row) => row?.apiTitle || 'N/A',
        sortable: true,
    },
    {
        name: "API Key",
        selector: (row) => row.keyToken,
        cell: (row) => row?.keyToken || 'N/A',
        width: "50%",
        sortable: true,
    }
];
