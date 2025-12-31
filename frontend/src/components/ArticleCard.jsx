export default function ArticleCard({ article, onUpdate }) {
  const {
    _id,
    title,
    originalContent,
    updatedContent,
    references,
    createdAt,
  } = article;

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>

      <section>
        <h3>Original Content</h3>
        <p>{originalContent}</p>
      </section>

      <section>
        <h3>Updated Content</h3>
        <p className={!updatedContent ? "muted" : ""}>
          {updatedContent || "Not generated yet"}
        </p>
      </section>

      <section>
        <h3>References</h3>
        {references?.length ? (
          <ul>
            {references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank" rel="noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No references</p>
        )}
      </section>

      <button
        className="update-btn"
        onClick={() => onUpdate(_id)}
      >
        Update Article
      </button>

      <div className="timestamp">
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  );
}
