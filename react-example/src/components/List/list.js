import './list.css';
/**
 * 
 * @param {{ items: Array }} items 
 */
function List({ items }) {
    const listItems = items.map(item => <li className="list-item">{item}</li>);
    return <ul className="list">{listItems}</ul>
}

export default List;