import { useCallback, useState } from "react";
import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Button,
  useBreakpoints,
  Tooltip,
  Badge,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { formatDate } from "../../utils/utils";
import Modal from "../../components/modal/modal";
import AddRule from "./addRule";

function DataTable({
  data,
  handleSearch,
  handleFilterRule,
  products,
  filterProducts,
  setProducts,
  setFilterProducts,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [queryValue, setQueryValue] = useState("");
  const [selected, setSelected] = useState(0);
  const [itemStrings, setItemStrings] = useState(["All", "Rules", "No Rule"]);
  const [idProductEdit, setIdProductEdit] = useState(null);

  const handleFiltersQueryChange = (value) => {
    setQueryValue(value);
    handleSearch(value);
  };

  const onHandleCancel = () => {};

  const handleFiltersClearAll = useCallback(() => {
    handleFiltersQueryChange();
  }, []);

  const handleGetImage = () => {};

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: (e) => {
      console.log(item);
      handleFilterRule(item);
    },
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions: [],
  }));

  const { mode, setMode } = useSetIndexFiltersMode();

  const resourceName = {
    singular: "data",
    plural: "data",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const rowMarkup = data.map(({ id, file, title, rule, lastUpdate }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <div className="d-flex gap-1 items-center">
          <img
            src={file ? URL.createObjectURL(file) : handleGetImage(index)}
            alt=""
            width="48px"
            height="48px"
          />
          <Tooltip content={id + ". " + title}>
            <span className="product-name">{id + ". " + title}</span>
          </Tooltip>
        </div>
      </IndexTable.Cell>

      <IndexTable.Cell>{rule ?? 0}</IndexTable.Cell>

      <IndexTable.Cell>
        {lastUpdate ? formatDate(lastUpdate) : formatDate()}
      </IndexTable.Cell>

      <IndexTable.Cell>
        {rule ? <Badge tone="success">Active</Badge> : <Badge>No Rule</Badge>}
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Button
          icon={PlusIcon}
          onClick={(e) => {
            e.stopPropagation();
            setIdProductEdit(id);
            handleModal();
          }}
        >
          Add rule
        </Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <>
      <LegacyCard>
        <IndexFilters
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={(e) => handleFiltersQueryChange(e)}
          onQueryClear={() => handleFiltersQueryChange("")}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          filters={[]}
          appliedFilters={[]}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product" },
            { title: "Rule(s)" },
            { title: "Last update" },
            { title: "Status" },
            { title: "" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <Modal isOpen={isOpen} onClose={handleModal} title="Add Rule">
        <AddRule
          id={idProductEdit}
          onClose={handleModal}
          products={products}
          filterProducts={filterProducts}
          setProducts={setProducts}
          setFilterProducts={setFilterProducts}
        />
      </Modal>
    </>
  );
}

export default DataTable;
