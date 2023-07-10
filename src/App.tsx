import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Converter } from "./components/Converter/Converter";
import { RatesTable } from "./components/RatesTable/RatesTable";

function App() {
  const [tabs, setTab] = useState(0);

  const handleTabChange = (index: number) => {
    setTab(index);
  };

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%" }}>
        <div style={{ position: "relative" }}>
          <Tabs selectedIndex={tabs} onSelect={handleTabChange}>
            <TabList>
              <Tab>Converter</Tab>
              <Tab>Rates</Tab>
            </TabList>

            <TabPanel>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}>
                <Converter />
              </div>
            </TabPanel>

            <TabPanel>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}>
                <RatesTable />
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
