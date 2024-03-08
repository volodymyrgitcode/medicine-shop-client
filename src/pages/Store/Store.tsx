import { useEffect, useState } from "react";
import { Medicine } from "../../models/Medicine";
import { Shop } from "../../models/Shop";
import MedicineService from "../../services/medicineService";
import ShopService from "../../services/shopService";
import './Store.css';
import MedicineCard from "../../components/MedicineCard";
import CartService from "../../services/cartService";
import { CartItem } from "../../models/CartItem";


function Store() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [selectedShops, setSelectedShops] = useState<string[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [sortingOption, setSortingOption] = useState<'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const initCartItems = CartService.getCartItems();
        setCartItems(initCartItems);
    }, []);

    useEffect(() => { fetchShops(); }, [])

    const fetchMedicines = async () => {
        try {
            let sortByPrice: 'asc' | 'desc' | undefined = undefined;
            let sortByDate: 'asc' | 'desc' | undefined = undefined;

            if (sortingOption) {
                const [field, direction] = sortingOption.split('-');

                if (field === 'price') {
                    sortByPrice = direction as 'asc' | 'desc';
                } else if (field === 'date') {
                    sortByDate = direction as 'asc' | 'desc';
                }
            }

            const medicineData = await MedicineService.getMedicines({
                shopIds: selectedShops,
                sortByPrice,
                sortByDate,
                page: currentPage,
                perPage: 5
            });

            setMedicines(medicineData.data);

            setTotalPages(medicineData.pagination.totalPages);

        } catch (error) {
            console.error('Error fetching products:', error);

        }
    };

    const fetchShops = async () => {
        try {
            const shopData = await ShopService.getShops();
            setShops(shopData);
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };

    const toggleShopFilter = (shopId: string) => {
        if (selectedShops.includes(shopId)) {
            setSelectedShops(selectedShops.filter(id => id !== shopId));
        } else {
            setSelectedShops([...selectedShops, shopId]);
        }
    };

    const handleAddToCart = (item: Medicine) => {
        const newItems = CartService.addCartItem(item)
        setCartItems(newItems)
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetchMedicines();
    }, [selectedShops, sortingOption, currentPage]);

    if (medicines.length <= 0) {
        return (
            <>
                <h2>No products</h2>
            </>
        );
    }

    return (
        <>
            <div className="container">
                <div className="filter-section">

                    <h2>Sort By:</h2>
                    <label>
                        <input
                            type="radio"
                            value="price-asc"
                            checked={sortingOption === 'price-asc'}
                            onChange={() => setSortingOption('price-asc')}
                        />
                        Lowest Price
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="price-desc"
                            checked={sortingOption === 'price-desc'}
                            onChange={() => setSortingOption('price-desc')}
                        />
                        Highest Price
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="date-asc"
                            checked={sortingOption === 'date-asc'}
                            onChange={() => setSortingOption('date-asc')}
                        />
                        Newest
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="date-desc"
                            checked={sortingOption === 'date-desc'}
                            onChange={() => setSortingOption('date-desc')}
                        />
                        Oldest
                    </label>

                    <h2>Shops:</h2>
                    <ul>
                        {shops.map((shop) => (
                            <li key={shop.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={shop.id}
                                        checked={selectedShops.includes(shop.id)}
                                        onChange={() => toggleShopFilter(shop.id)}
                                    />
                                    {shop.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="products-grid">
                        {medicines.map((medicine) => <MedicineCard key={medicine.id} onAddToCart={handleAddToCart} isAdded={!!cartItems.find(e => medicine.id === e.id)} medicine={medicine}></MedicineCard>)}
                    </div>
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
                        <span>{currentPage} of {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Store