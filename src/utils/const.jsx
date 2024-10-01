import { Icon } from "@shopify/polaris";
import { HomeIcon, ProductIcon, SettingsIcon } from "@shopify/polaris-icons";

export const menu = [
  {
    id: 1,
    label: "Dashboard",
    url: "/",
    icon: <Icon source={HomeIcon} />,
  },
  {
    id: 2,
    label: "Products",
    url: "/product",
    icon: <Icon source={ProductIcon}/>,
  },
  {
    id: 3,
    label: "Settings",
    url: "/setting",
    icon: <Icon source={SettingsIcon} />,
  }
]