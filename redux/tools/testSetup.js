import { configure } from "enzyme";
// example of enzyme adapter for react, no version exists for react-18
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });
