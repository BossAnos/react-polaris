const linkApi = process.env.REACT_APP_API_LINK;

export const apiGetProductList = async () => {
  try {
    const response = await fetch(linkApi);

    if(!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu: ", error);
    throw error;
  }
}