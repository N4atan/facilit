import * as XLSX from 'xlsx';

export const exportToExcel = async ({ data, name }: { data: any[]; name: string }) => {
    try {
        const json = data;

        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, name);

        // Gera o arquivo e inicia o download no navegador
        XLSX.writeFile(workbook, `${name}-${new Date().toLocaleDateString()}.xlsx`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

