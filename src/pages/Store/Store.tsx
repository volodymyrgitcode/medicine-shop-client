
import { useEffect, useState } from 'react'
import { MedicineService } from '../../services/medicineService';
import { Medicine } from '../../models/Medicine';
import './Store.css';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import { Shop } from '../../models/Shop';
import { ShopService } from '../../services/shopService';
import { CartService } from '../../services/cartService';
import { CartItem } from '../../models/CartItem';

interface sortingOptions {
    sortByPrice?: 'asc' | 'desc';
    sortByDate?: 'asc' | 'desc';
}

function Store() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [selectedShops, setSelectedShops] = useState<string[]>([]);
    const [sortingOptions, setSortingOption] = useState<sortingOptions>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    async function fetchMedicines() {
        const { data, pagination } = await MedicineService.getMedicines({
            shopIds: selectedShops,
            page: currentPage,
            perPage: 15,
            sortByDate: sortingOptions.sortByDate,
            sortByPrice: sortingOptions.sortByPrice
        });
        setMedicines(data);
        setTotalPages(pagination.totalPages);
    }

    const fetchShops = async () => {
        const shopData = await ShopService.getShops();
        setShops(shopData);
    };

    useEffect(() => { fetchShops(); }, [])

    useEffect(() => {
        fetchMedicines();
    }, [selectedShops, sortingOptions, currentPage]);

    useEffect(() => {
        const initCartItems = CartService.getCartItems();
        setCartItems(initCartItems);
    }, []);


    const toggleShopFilter = (shopId: string) => {
        if (selectedShops.includes(shopId)) {
            setSelectedShops(selectedShops.filter(id => id !== shopId));
        } else {
            setSelectedShops([...selectedShops, shopId]);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (item: Medicine) => {
        const newItems = CartService.addCartItem(item)
        setCartItems(newItems)
    }

    return (
        <>
            <h1>
                Medicines
            </h1>

            <div className="store-container">
                <section className="filters">


                    <h2>Filters</h2>
                    <h3>Sort by</h3>
                    <label>
                        <input
                            type="radio"
                            value="price-asc"
                            checked={sortingOptions.sortByPrice === 'asc'}
                            onChange={() => { setSortingOption({ sortByPrice: 'asc' }); setCurrentPage(1); }}
                        />
                        Lowest Price
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="price-desc"
                            checked={sortingOptions.sortByPrice === 'desc'}
                            onChange={() => { setSortingOption({ sortByPrice: 'desc' }); setCurrentPage(1); }}
                        />
                        Highest Price
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="date-asc"
                            checked={sortingOptions.sortByDate === 'asc'}
                            onChange={() => { setSortingOption({ sortByDate: 'asc' }); setCurrentPage(1); }}
                        />
                        Newest
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="date-desc"
                            checked={sortingOptions.sortByDate === 'desc'}
                            onChange={() => { setSortingOption({ sortByDate: 'desc' }); setCurrentPage(1); }}
                        />
                        Oldest
                    </label>
                    <h3>Shops</h3>

                    {shops.map((shop) => (
                        <label key={shop.id}>
                            <input
                                type="checkbox"
                                value={shop.id}
                                checked={selectedShops.includes(shop.id)}
                                onChange={() => toggleShopFilter(shop.id)}
                            />
                            {shop.name}
                        </label>
                    ))}
                </section>

                <section className='products'>
                    <div className="cards-grid">
                        {
                            medicines.map((medicine) =>

                                <MedicineCard key={medicine.id}
                                    onAddToCart={handleAddToCart}
                                    isAdded={cartItems.some(e => medicine.id === e.id)}
                                    medicine={medicine}></MedicineCard>
                            )
                        }
                    </div>

                    <div className="pagination">
                        {
                            medicines.length > 0 &&
                            <>
                                <button className='button-primary' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
                                <span>{currentPage} of {totalPages}</span>
                                <button className='button-primary' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                            </>
                        }

                    </div>
                </section>
            </div>
        </>
    )
}

export default Store;
