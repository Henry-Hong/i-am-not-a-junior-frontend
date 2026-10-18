import React from "react";

const USERS_URL = "https://example.com/api/users";

function useAsync(callback, deps = []) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const execute = React.useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await callback(...args);
      setValue(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, deps);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return { loading, error, value, execute };
}

const getUser = (page) =>
  fetch(`${USERS_URL}?page=${page}`).then((res) => res.json());

const INITIAL_PAGE = 0;
const MAX_ROWS = 10;

export default function Table() {
  const [page, setPage] = React.useState(INITIAL_PAGE);

  const { loading, value } = useAsync(() => getUser(page), [page]);

  const totalCount = value ? value.count : 0;
  const tableDatas = value ? value.results : [];

  const maxPage = Math.ceil(totalCount / MAX_ROWS);

  const paginationButtons = [
    {
      disabled: loading || page <= 0,
      content: "first",
      className: "first-page-btn",
      onClick: () => {
        setPage(0);
      },
    },
    {
      disabled: loading || page <= 0,
      content: "previous",
      className: "previous-page-btn",
      onClick: () => {
        setPage((prev) => Math.max(prev - 1, 0));
      },
    },
    {
      disabled: loading || page >= maxPage - 1,
      content: "next",
      className: "next-page-btn",
      onClick: () => {
        setPage((prev) => Math.min(prev + 1, maxPage - 1));
      },
    },
    {
      disabled: loading || page >= maxPage - 1,
      content: "last",
      className: "last-page-btn",
      onClick: () => {
        setPage(maxPage - 1);
      },
    },
  ];

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {tableDatas.map((tableData) => {
            return (
              <tr key={tableData.id}>
                <td>{tableData.id}</td>
                <td>{tableData.firstName}</td>
                <td>{tableData.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className="pagination">
        {paginationButtons.map((button) => (
          <button
            onClick={button.onClick}
            disabled={button.disabled}
            className={button.className}
          >
            {button.content}
          </button>
        ))}
      </section>
    </div>
  );
}
