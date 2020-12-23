import React, {useState} from 'react';
import { BottomMenu, Item } from "react-native-bottom-menu";

const BottomMenuWrapper = props => {
    const [isActive, setActive] = useState("home");
    return (
        <BottomMenu>
            <Item
                size={22}
                name="home"
                text="Home"
                type="Octicons"
                isActive={isActive == "home" ? true : false}
                onPress={() => setActive("home")}
            />
            <Item
                size={22}
                type="Feather"
                text="Messages"
                name="message-circle"
                isActive={isActive == "messages" ? true : false}
                onPress={() => setActive("messages")}
            />
            <Item
                size={30}
                name="cart"
                text="Cart"
                type="EvilIcons"
                isActive={isActive == "cart" ? true : false}
                onPress={() => setActive("cart")}
            />
            <Item
                size={22}
                name="settings"
                text="Settings"
                type="SimpleLineIcons"
                isActive={isActive == "settings" ? true : false}
                onPress={() => setActive("settings")}
            />
        </BottomMenu>
    );
};

export default BottomMenuWrapper;
