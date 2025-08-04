import { useWishlist } from "../context/WishlistContext";
import { addToWishlist, removeFromWishlist } from "../api/wishlist";
import { useEffect, useState } from "react";
import "./WishlistButton.css";
import { toast } from "react-toastify";

const WishlistButton = ({ product }) => {
  const { wishlist, fetchWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const isInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((item) => item._id === product._id);

  const handleClick = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to use wishlist!");
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        toast.info("Removed from wishlist!");
      } else {
        await addToWishlist(product._id);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);
        toast.success("Added to wishlist!");
      }
      await fetchWishlist();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <button
      className={`wishlist-button ${isInWishlist ? "active" : ""} ${
        isAnimating ? "animate" : ""
      }`}
      onClick={handleClick}
    >
      <span className="heart-icon">{isInWishlist ? "❤️" : "🤍"}</span>
    </button>
  );
};

export default WishlistButton;
