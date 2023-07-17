export default async function handleFile(req, res) {
    let data = []
    let colz = [];
    let jsonData;
    try {
        let url = `${process.env.NEXT_GOOGLE_SHEET_URL}/${process.env.NEXT_GOOGLE_SHEET_ID}/gviz/tq`
        await fetch(url)
            .then(res => res.text())
            .then(rep => {
                jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                //Extract column labels
                jsonData.table.cols.forEach((heading) => {
                    if (heading.label) {
                        let column = heading.label;
                        colz.push(column);
                    }
                })
                //Extract row data:
                jsonData.table.rows.forEach((rowData) => {
                    const row = {};
                    colz.forEach((ele, ind) => {
                        row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                    })
                    data.push(row);
                })
            })

        res.status(200).send({ rowsData:data})
    } catch (e) {
        res.status(400).send({ error: 'Some thing went wrong!' })
    }
}