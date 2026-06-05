import { Tabs } from "@heroui/react";

const ValueInput = ({ keyValue }: { keyValue: number[][] }) => {
  return (
    <div className="mt-6">
      <Tabs className="w-full">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="encrypt">
              Encrypt
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="decrypt">
              Decrypt
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-2" id="encrypt">
          <p>Key: {keyValue}</p>
          <p>Encrypt your data with our secure encryption methods.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-2" id="decrypt">
          <p>Decrypt your data using the appropriate decryption keys.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default ValueInput;
