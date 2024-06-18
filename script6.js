$(document).ready(function() {
    const jsonData = {
        "stock": {
            "firma1": 99,
            "firma2": 21,
            "firma3": 91,
            "firma4": 19
        },
        "news": "trzy"
    };

    function createNewsTable(news) {
        const $newsTable = $('<table></table>');
        const $newsRow = $('<tr></tr>');
        const $newsData = $('<td></td>').text(news);
        $newsRow.append($newsData);
        $newsTable.append($newsRow);
        $('body').prepend($newsTable); // Ensure the news table is at the top
    }

    function createStockTable(stock) {
        const $stockTable = $('<table></table>');
        const $thead = $('<thead></thead>');
        const $tbody = $('<tbody></tbody>');

        // Create table header for stock
        const $stockHeaderRow = $('<tr></tr>');
        $stockHeaderRow.append($('<th></th>').text('Company'));
        $stockHeaderRow.append($('<th></th>').text('Value'));
        $thead.append($stockHeaderRow);

        // Create table body for stock
        Object.keys(stock).forEach(key => {
            const $row = $('<tr></tr>');
            const $company = $('<td></td>').text(key);
            const $value = $('<td></td>').text(stock[key]);
            $row.append($company);
            $row.append($value);
            $tbody.append($row);
        });

        $stockTable.append($thead);
        $stockTable.append($tbody);
        $('body').append($stockTable); // Append the stock table below the news table
    }

    createNewsTable(jsonData.news);
    createStockTable(jsonData.stock);
});