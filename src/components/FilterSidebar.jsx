import { useEffect, useState } from "react";
const groups = {
  Categories: ["Cookware","Kitchen Tools","Utensils","Storage & Containers","Kitchen Appliances","Spice Organizers","Bottles & Lunch Boxes","Cleaning & Organizers"],
  Brands: ["Prestige","Pigeon","Hawkins","Wonderchef","Vinod"],
  Material: ["Non-stick","Stainless Steel","Cast Iron","Aluminium","Glass"],
  Ratings: ["4★ & above","3★ & above","2★ & above"]
};
export default function FilterSidebar({ filters, setFilters }) {
  const [price, setPrice] = useState(filters.maxPrice ?? 10000);
  useEffect(() => { setPrice(filters.maxPrice ?? 10000); }, [filters.maxPrice]);
  const toggle = (key, value) => {
    setFilters(prev => {
      const arr = prev[key] || [];
      const next = arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };
  return <aside className="filter-sidebar">
    <div className="filter-head"><strong>Filters</strong><button onClick={() => { setPrice(10000); setFilters({}); }}>Clear All</button></div>
    <FilterGroup title="Categories">{groups.Categories.map(x => <label key={x}><input type="checkbox" checked={(filters.categories||[]).includes(x)} onChange={() => toggle("categories", x)} />{x}<span></span></label>)}</FilterGroup>
    <div className="filter-group"><h4>Price Range</h4><input type="range" min="0" max="10000" step="100" value={price} onChange={e => { setPrice(+e.target.value); setFilters(f => ({...f, maxPrice:+e.target.value})); }} /><div className="range-values"><span>₹0</span><span>₹{price.toLocaleString("en-IN")}</span></div></div>
    <FilterGroup title="Brand">{groups.Brands.map(x => <label key={x}><input type="checkbox" checked={(filters.brands||[]).includes(x)} onChange={() => toggle("brands", x)} />{x}<span></span></label>)}</FilterGroup>
    <FilterGroup title="Material">{groups.Material.map(x => <label key={x}><input type="checkbox" checked={(filters.material||[]).includes(x)} onChange={() => toggle("material", x)} />{x}<span></span></label>)}</FilterGroup>
    <FilterGroup title="Ratings">{groups.Ratings.map(x => <label key={x}><input type="checkbox" checked={(filters.ratings||[]).includes(x)} onChange={() => toggle("ratings", x)} />{x}<span></span></label>)}</FilterGroup>
  </aside>;
}
function FilterGroup({ title, children }) { return <div className="filter-group"><h4>{title}</h4>{children}</div>; }