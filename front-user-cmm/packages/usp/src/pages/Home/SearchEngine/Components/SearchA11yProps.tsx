export default function SearchA11yProps(index: number) {
  return {
    id: `searchResult-tab-${index}`,
    'aria-controls': `searchResult-tabpanel-${index}`,
  };
}
