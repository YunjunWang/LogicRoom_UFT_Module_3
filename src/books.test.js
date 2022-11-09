import BooksPresenter from "./Books/BooksPresenter";
import httpGateway from "./Shared/HttpGateway";

it("should call the http get with correct url and return correct data to the viewmodel", async () => {
  httpGateway.get = jest.fn().mockImplementation(() => {
    return {
      success: true,
      result: [
        {
          bookId: 13501,
          name: "Wind in the willows",
          ownerId: "pete@logicroom.co",
          author: "Kenneth Graeme"
        },
        {
          bookId: 13511,
          name: "I, Robot",
          ownerId: "pete@logicroom.co",
          author: "Isaac Asimov"
        },
        {
          bookId: 13521,
          name: "The Hobbit",
          ownerId: "pete@logicroom.co",
          author: "Jrr Tolkein"
        }
      ]
    };
  });

  let viewmodel = null;

  let booksPresenter = new BooksPresenter();
  await booksPresenter.load((generatedViewModel) => {
    viewmodel = generatedViewModel;
  });

  expect(httpGateway.get).toHaveBeenCalledTimes(1);
  expect(httpGateway.get).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/yunjun.wangirl@gmail.com/books"
  );
  expect(viewmodel.length).toBe(3);

  expect(viewmodel[0].name).toBe("Wind in the willows");
  expect(viewmodel[1].name).toBe("I, Robot");
  expect(viewmodel[2].name).toBe("The Hobbit");
});
