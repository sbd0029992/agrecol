import Login from "@/app/pages/login";
import Register from "@/app/pages/user/register";
import MainPage from "@/app/pages/home";
import RegisterProduct from "@/app/pages/product/register";
import ListProduct from "@/app/pages/product/list";
import Cart from "@/app/pages/product/cart";

export default function Home() {
  return (
    <main>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <MainPage /> */}
      {/* <RegisterProduct /> */}
      <Cart />
    </main>
  );
}
