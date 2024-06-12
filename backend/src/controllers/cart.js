const Cart = require('../model/cart');
const Product = require('../model/product');


const addToCart = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const { product, quantity } = req.body;

    const existingCartItem = await Cart.findOne({ user: userId, product });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      res.status(200).json({ message: 'Quantity incremented', cartItem: existingCartItem });
    } else {
      const cartItem = new Cart({
        user: userId,
        product: product,
        quantity: 1, 
      });

      await cartItem.save();
      res.status(201).json({ message: 'Cart item created', cartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; 

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const updatedItems = userCart.items.filter(
      (item) => item.product.toString() !== productId
    );
    userCart.items = updatedItems;

    await userCart.save();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAll = async (req, res, next) => {
  const user_id = req.user.user_id;
  
  try {
      const result = await Cart.find({ user: user_id });
      
      res.status(201).send(result);
  }
  catch (error) {
      next(error)
  }
}

exports.getdetailsbyid = async (req, res, next) => {
  try {
      const id = req.params.id
      const result = await Cart.findById(id);
      res.status(201).send(result);
  }
  
  catch (error) {
      next(error)
  }

}


const deleteCart = async (req, res, next) => {
  try {
      const id = req.params.id
      console.log(id)
      const result = await Cart.findByIdAndDelete(id);
      res.status(200).send(result);
  }
  catch (error) {
      next(error)
  }

}

const editCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body; 

    const result = await Cart.findByIdAndUpdate(id, { quantity: quantity }, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const getCartTotal = async (req, res) => {
  const userId = req.user.user_id; 
  try {
    const cartItems = await Cart.find({ user: userId });

    let totalQuantity = 0;
    for (const cartItem of cartItems) {
      totalQuantity += cartItem.quantity;
    }

    res.status(200).json({ totalQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

    module.exports = { addToCart, removeFromCart,getAll,deleteCart, editCart, getCartTotal };