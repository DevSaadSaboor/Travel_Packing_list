export function Stats({ item }) {
    const checkItemPacked = item.length;
    const numpacked = item.filter((item) => item.packed).length;
    const itemPercentage = Math.round((numpacked / checkItemPacked) * 100);
    return (
        <footer>
            {itemPercentage === 100 ? "You got Everything Packed Ready to Go ✈ " :
                `💼 You have ${checkItemPacked} items on your list, you already packed ${numpacked} ${itemPercentage}%  `}
        </footer>
    );
}
