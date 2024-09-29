class ImageLoader {
  #images: Map<String, ImageBitmap>;
  static _instance: ImageLoader;

  constructor() {
    this.#images = new Map();
  }

  loadImage = (path: string): ImageBitmap | null => {
    const bitmap = this.#images.get(path);
    if (bitmap instanceof ImageBitmap) {
      return bitmap;
    }
    const img = new Image();
    img.src = path;
    img.onload = async () => {
      this.#images.set(path, await createImageBitmap(img));
    };
    return null;
  };

  public static Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default ImageLoader.Instance();
