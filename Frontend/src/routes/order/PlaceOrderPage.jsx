// import React, { useState, useEffect } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";
// import { toast } from "react-toastify";
// import "./PlaceOrderPage.css";

// const PlaceOrderPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();

//   // 🛒 Fetch Cart Items
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const decoded = jwtDecode(token);
//         const userId = decoded.userId;
//         const res = await api.get(`/cart/${userId}`);
//         console.log("Cart response:", res.data);
//         setCartItems(res.data?.items);
//         const total = res.data?.items.reduce(
//           (acc, item) => acc + item.product.price * item.quantity,
//           0
//         );
//         console.log("Cart products:", res.data?.items);

//         setTotalPrice(total);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//       }
//     };

//     fetchCart();
//   }, []);


//   const handlePlaceOrder = async () => {
//     if (!address) return toast.error("Please enter your address");

//     try {
//       const formattedProducts = cartItems.map((item) => ({
//         productId: item.product._id,
//         quantity: item.quantity,
//       }));

//       await api.post("/orders", {
//         products: formattedProducts,
//         address,
//         totalPrice,
//       });

//       toast.success("Order placed successfully");
//       navigate("/orders"); // optional: create orders page
//     } catch (err) {
//       console.error("Order error:", err);
//       toast.error("Error placing order");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
//       <h2>🧾 Review Your Order</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.product._id}>
//                 {item.product.name} x {item.quantity} = Rs.{" "}
//                 {item.product.price * item.quantity}
//               </li>
//             ))}
//           </ul>
//           <p>
//             <strong>Total: Rs. {totalPrice}</strong>
//           </p>

//           <textarea
//             placeholder="Enter shipping address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             rows={4}
//             style={{ width: "100%", marginTop: "1rem" }}
//           />

//           <button
//             onClick={handlePlaceOrder}
//             style={{
//               marginTop: "1rem",
//               backgroundColor: "#ff3f6c",
//               color: "white",
//               padding: "0.75rem 1.5rem",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//           >
//             🛍️ Place Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default PlaceOrderPage;


import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "./PlaceOrderPage.css";

const PlaceOrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        const res = await api.get(`/cart/${userId}`);
        setCartItems(res.data?.items || []);
        const total = res.data?.items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return toast.error("Please enter your address");

    try {
      const formattedProducts = cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

      await api.post("/orders", {
        products: formattedProducts,
        address,
        totalPrice,
      });

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Error placing order");
    }
  };

 return (
  <div className="place-order-wrapper">
    <div className="place-order-container">
      <h2 className="place-order-title">🧾 Review Your Order</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.product._id} className="cart-item">
                <span className="item-name">{item.product.name}</span>
                <span className="item-quantity">x {item.quantity}</span>
                <span className="item-price">
                  Rs. {item.product.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <p className="total-price">
            <strong>Total: Rs. {totalPrice}</strong>
          </p>

          <textarea
            placeholder="Enter shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="address-input"
          />

          <button onClick={handlePlaceOrder} className="place-order-button">
            🛍️ Place Order
          </button>
        </>
      )}
    </div>
  </div>
);

};

export default PlaceOrderPage;

