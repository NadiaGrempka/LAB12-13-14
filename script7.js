$(document).ready(function() {
    const url = 'https://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php';

    function createNewsTable(news) {
        const $newsTable = $('<table></table>');
        const $newsRow = $('<tr></tr>');
        const $newsData = $('<td></td>').text(news);
        $newsRow.append($newsData);
        $newsTable.append($newsRow);
        $('body').prepend($newsTable);
    }

    function createStockTable(stock) {
        const $stockTable = $('<table></table>');
        const $thead = $('<thead></thead>');
        const $tbody = $('<tbody></tbody>');

        const $stockHeaderRow = $('<tr></tr>');
        $stockHeaderRow.append($('<th></th>').text('Company'));
        $stockHeaderRow.append($('<th></th>').text('Value'));
        $thead.append($stockHeaderRow);

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
        $('body').append($stockTable);
    }

{
        $.getJSON(url, function (data) {
            createStockTable(data.stock);
            createNewsTable(data.news);

        }).fail(function () {
            console.error('Error fetching the JSON data.');
        });
    }

});