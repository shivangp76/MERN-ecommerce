class Cart {
  constructor(oldCart) {
    // if (
    //   !(
    //     Object.entries(oldCart).length === 0 && oldCart.constructor === Object
    //   ) &&
    //   !(
    //     typeof oldCart.items === "array" &&
    //     this.containsValidProducts(oldCart.items) &&
    //     typeof oldCart.containsLunchItem === "boolean" &&
    //     Number.isInteger(oldCart.totalQty) &&
    //     Math.sign(oldCart.totalQty) !== -1 &&
    //     typeof oldCart.totalPrice === "number" &&
    //     Math.sign(oldCart.totalPrice) !== -1
    //   )
    // )
    //   throw new Error("Cart is invalid");
    this.items = oldCart.items || [];
    this.containsLunchItem = oldCart.containsLunchItem || false;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
  }

  containsValidProducts(items) {
    return items.forEach((e, i) => {
      if (
        !items[i].hasOwnProperty("_id") ||
        !items[i].hasOwnProperty("title") ||
        !items[i].hasOwnProperty("description") ||
        !items[i].hasOwnProperty("categoryID") ||
        !items[i].hasOwnProperty("price") ||
        typeof items[i]["price"] !== "number" ||
        !items[i].hasOwnProperty("qty") ||
        typeof items[i]["qty"] !== "number"
      ) {
        return false;
      }
      if (i === items.length - 1) return true;
    });
  }

  calcTotalPrice() {
    this.totalPrice = 0;
    this.items.forEach(item => {
      this.totalPrice += item.price * item.qty;
    });
    this.totalPrice *= 1.06625;
    this.totalPrice = Math.round(this.totalPrice * 1e2) / 1e2;
  }

  setItemIndex(id, SKU) {
    if (SKU) {
      return this.items.findIndex(obj => {
        return obj._id == id && obj.SKU == SKU;
      });
    }
    return this.items.findIndex(obj => obj._id == id);
  }

  createNewItem(item, SKU, variantIndex) {
    if (SKU) {
      var newItem = {
        _id: item._id,
        title: item.title,
        description: item.description,
        categoryID: item.categoryID,
        SKU: item.variants[variantIndex].SKU,
        price: item.variants[variantIndex].price,
        attributes: item.variants[variantIndex].attributes,
        qty: 1
      };
    } else {
      var newItem = {
        _id: item._id,
        title: item.title,
        description: item.description,
        categoryID: item.categoryID,
        price: item.price,
        qty: 1
      };
    }
    this.items.push(newItem);
  }

  setContainsLunchItem(categoryID) {
    this.containsLunchItem = this.items.some(item => {
      item.categoryID == categoryID;
    });
  }

  add(item, SKU) {
    var itemIndex = this.setItemIndex(item._id, SKU);
    var variantIndex = SKU
      ? item.variants.findIndex(variant => {
          return variant.SKU.toString() == SKU;
        })
      : undefined;
    if (variantIndex === -1) throw new Error("SKU is incorrect");
    if (itemIndex === -1) {
      SKU
        ? this.createNewItem(item, SKU, variantIndex)
        : this.createNewItem(item);
    } else {
      this.items[itemIndex].qty++;
    }
    this.totalQty++;
    this.calcTotalPrice();
  }

  reduce(id, SKU) {
    var itemIndex = this.setItemIndex(id, SKU);
    if (itemIndex === -1 && SKU) throw new Error("SKU is incorrect");
    if (itemIndex !== -1) {
      this.items[itemIndex].qty--;
      this.totalQty--;
      this.calcTotalPrice();
      if (this.items[itemIndex].qty <= 0) {
        this.items.splice(itemIndex, 1);
      }
    }
  }

  remove(id, SKU) {
    var itemIndex = this.setItemIndex(id, SKU);
    if (itemIndex === -1 && SKU) throw new Error("SKU is incorrect");
    if (itemIndex !== -1) {
      this.totalQty -= this.items[itemIndex].qty;
      this.items.splice(itemIndex, 1);
      this.calcTotalPrice();
    }
  }
}

module.exports = Cart;
