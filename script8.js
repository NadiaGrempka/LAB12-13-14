$(document).ready(function() {
    const url = 'https://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php';
    let $stockTable; // Cache the stock table element
    let $newsTable; // Cache the news table element

    function createNewsTable(news) {
        $newsTable = $('<table></table>');
        const $newsRow = $('<tr></tr>');
        const $newsData = $('<td></td>').text(news);
        $newsRow.append($newsData);
        $newsTable.append($newsRow);
        $('body').prepend($newsTable);
    }

    function createStockTable(stock) {
        $stockTable = $('<table></table>'); // Create the table only once
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

    async function fetchData() {
        $.getJSON(url, function (data) {
            if (!$stockTable) { // Check if stock table exists (first fetch)
                createStockTable(data.stock);
            } else {
                updateStockValues(data.stock); // Update existing stock table
            }
            if (!$newsTable) {  // Check if news table exists (first fetch)
                createNewsTable(data.data.news); // Assuming 'news' is within 'data' object
            }
        }).fail(function () {
            console.error('Error fetching the JSON data.');
        });
    }

    function updateStockValues(stockData) {

            $stockTable.find('tbody tr').each(function(index, row) {
                const company = $(row).find('td:first-child').text();
                const newValue = stockData[company];
                if (newValue) { // Check if data exists for the company
                    $(row).find('td:last-child').text(newValue);
                }
            });
        }


    // Call fetchData initially to populate the tables
    fetchData();

    // Update stock values every 10 seconds
    setInterval(fetchData, 10000); // 1000 milliseconds = 10 seconds
});