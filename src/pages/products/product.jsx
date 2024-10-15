import { useEffect, useState } from "react";
import { Button, Page, Pagination } from "@shopify/polaris";
import useTitle from "../../hook/useTitle";
import Modal from "../../components/modal/modal";
import DataTable from "./dataTable";
import { apiGetProductList } from "../../apis/product";
import AddProduct from "./addProduct";

function Product() {
  useTitle("Product");
  const [isOpen, setIsOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [isHasRule, setIsHasRule] = useState("ALL");
  const [newProduct, setNewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  const handleGetListProducts = async () => {
    try {
      const res = await apiGetProductList();
      setProducts(res);
      setFilterProducts(res.slice(0, 10));
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setProducts([]);
    }
  };

  useEffect(() => {
    handleGetListProducts();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.clear();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [])

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (value) => {
    setKeySearch(value);
    let filterProduct = [...products].filter((item) => item.title.toLowerCase().startsWith(value.toLowerCase()));

    filterProduct = filterProduct.filter((item) => 
      isHasRule === "All" ? item : isHasRule === true ? item.rule : !item.rule
    )

    handleSetProduct(filterProduct, 1);
  }

  const handleFilterRule = (value) => {
    const rule = value === "All" ? "All" : value === "Rules" ? true : false;
    setIsHasRule(rule);
    let filterProduct = [...products].filter((item) => 
      rule === "All" ? item : rule === true ? item.rule : !item.rule
    )

    filterProduct = filterProduct.filter((item) => 
      keySearch ? item.title.toLowerCase().startsWith(value.toLowerCase()) : item
    )

    handleSetProduct(filterProduct, 1);
  }

  const handleSetProduct = (data = products, page = 1) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setFilterProducts(currentItems);
    setCurrentPage(page);
  }

  const handleAddProduct = (product) => {
    setNewProduct(product);
    setKeySearch("");
    setIsHasRule("all");
    products.unshift({ ...product, id: products.length + 1 });
    handleSetProduct(products, 1)
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
      handleSetProduct(products, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handleSetProduct(products, currentPage - 1);
    }
  };

  const handleAddRule = (e) => {
      e.stopPropagation();
      handleModal();
    };

  return (
    <>
      <Page
        title="Product"
        primaryAction={
          <Button variant="primary" onClick={handleModal}>
            Add Product
          </Button>
        }
      >
        <DataTable
          data={filterProducts}
          handleSearch={handleSearch}
          handleFilterRule={handleFilterRule}
          products={products}
          filterProducts={filterProducts}
          setProducts={setProducts}
          setFilterProducts={setFilterProducts}
          handleAddRule={handleAddRule}
        />

        <Modal isOpen={isOpen} onClose={handleModal} title="Add Product">
          <AddProduct
            onClose={handleModal}
            handleAddProduct={handleAddProduct}
          />
        </Modal>

        <Pagination
          hasPrevious={currentPage > 1}
          onPrevious={handlePreviousPage}
          hasNext={currentPage < Math.ceil(products.length / itemsPerPage)}
          onNext={handleNextPage}
        />
      </Page>
    </>
  );
}

export default Product;
