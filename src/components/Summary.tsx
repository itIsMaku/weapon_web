import "./Summary.css";

function parseDataByDateRange(from: Date, to: Date, data: any) {
    let filteredData: any = {};
    for (let property of Object.keys(data)) {
        filteredData[property] = data[property].filter((item: any) => {
            let date = new Date(item.date);
            return date >= from && date <= to;
        });
    }
    let totalFromInvoices = 0;
    let totalFromShop = 0;
    let totalCraftedItems = 0;
    let totalCraftedValue = 0;
    for (let invoice of filteredData.invoices) {
        totalFromInvoices += invoice.price;
    }
    for (let shop of filteredData.shop) {
        totalFromShop += shop.price * shop.count;
    }
    for (let crafting of filteredData.crafting) {
        totalCraftedItems += 1;
        totalCraftedValue += crafting.price;
    }
    let totalMade = totalFromInvoices + totalFromShop - totalCraftedValue;
    return {
        totalMade: totalMade,
        totalFromInvoices: totalFromInvoices,
        totalFromShop: totalFromShop,
        totalCraftedItems: totalCraftedItems,
        totalCraftedValue: totalCraftedValue,
        elements: filteredData,
    };
}

export default function FactionSelect({
    faction,
    factionData,
}: {
    faction: any;
    factionData: any;
}) {
    const dateRanges = [
        {
            title: "Poslední měsíc",
            from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
            to: new Date(),
        },
        {
            title: "Poslední týden",
            from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            to: new Date(),
        },
        {
            title: "Poslední 24 hodin",
            from: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            to: new Date(),
        },
        {
            title: "Celkově",
            from: new Date(0),
            to: new Date(),
        },
    ];
    return (
        <div className="summary">
            <div className="summary-header">Shrnutí - {faction.title}</div>
            <div className="summary-categories">
                {factionData != undefined &&
                    dateRanges.map((dateRange) => {
                        let data = parseDataByDateRange(
                            dateRange.from,
                            dateRange.to,
                            factionData
                        );
                        return (
                            <div className="summary-category">
                                <div className="summary-category-header">
                                    {dateRange.title}
                                </div>
                                <div className="summary-category-content">
                                    <div className="summary-category-item">
                                        <div className="summary-category-item-title">
                                            Souhrnný výdělek
                                        </div>
                                        <div className="summary-category-item-content green">
                                            {data.totalMade}$
                                        </div>
                                    </div>
                                    <div className="summary-category-item">
                                        <div className="summary-category-item-title">
                                            Příjem z faktur
                                        </div>
                                        <div className="summary-category-item-content">
                                            {data.totalFromInvoices}$ (
                                            {data.elements.invoices.length}{" "}
                                            faktur)
                                        </div>
                                    </div>
                                    <div className="summary-category-item">
                                        <div className="summary-category-item-title">
                                            Příjem ze samoobsluhy
                                        </div>
                                        <div className="summary-category-item-content">
                                            {data.totalFromShop}$ (
                                            {data.elements.shop.length} itemů)
                                        </div>
                                    </div>
                                    <div className="summary-category-item">
                                        <div className="summary-category-item-title">
                                            Vyrobeno v craftingu
                                        </div>
                                        <div className="summary-category-item-content red">
                                            {data.totalCraftedValue}$ (
                                            {data.totalCraftedItems} itemů)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
