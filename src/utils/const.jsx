import { Icon } from "@shopify/polaris";
import {
  HomeFilledIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";

export const menu = [
  {
    id: 1,
    label: "Dashboard",
    to: "/",
    icon: <Icon source={HomeFilledIcon} tone="base" />,
  },
  {
    id: 2,
    label: "Products",
    to: "/product",
    icon: <Icon source={OrderFilledIcon} tone="base" />,
  },
  {
    id: 3,
    label: "Settings",
    to: "/setting",
    icon: <Icon source={ProductFilledIcon} tone="base" />,
  },
];

export const folder_menu = {
  label: "Settings",
  to: "/setting",
  icon: <Icon source={SettingsIcon} tone="base" />,
};
