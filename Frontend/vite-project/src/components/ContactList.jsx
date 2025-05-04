export default function ContactList({ contacts, onSelect }) {
    return (
      <div style={{ width: "30%", borderRight: "1px solid gray" }}>
        <h3>Contacts</h3>
        {contacts.map((c) => (
          <div key={c._id} onClick={() => onSelect(c)}>
            <p>{c.name} ({c.phone})</p>
          </div>
        ))}
      </div>
    );
  }