export class ProductNotFound extends Error {
  constructor() {
    super("Product is not found");
  }
}

export class ImgAlreadyAdded extends Error {
  constructor() {
    super("Image is already added to product");
  }
}

export class ImgNotExists extends Error {
  constructor() {
    super("Image not Exists");
  }
}
