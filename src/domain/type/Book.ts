/** 書籍 */
export class Book {
  /**
   * コンストラクタ
   * @param isbn ISBN
   * @param title 書籍タイトル
   * @param price 価格
   */
  private constructor(
    public readonly isbn: string,
    public readonly title: string,
    public readonly price: number
  ) { }

  /**
   * 書籍ファクトリ
   *
   * @param isbn ISBN
   * @param title 書籍タイトル
   * @param price 価格
   */
  static of(isbn: string, title: string, price: number) {
    return new Book(isbn, title, price)
  }
}
