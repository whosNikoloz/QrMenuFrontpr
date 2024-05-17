import { Option } from "./Option";

interface ProductData {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  discount: number;
  description: string;
  formattedPrice: string;
  discountedPrice: string;
  options: Option[];
}

export default ProductData;
