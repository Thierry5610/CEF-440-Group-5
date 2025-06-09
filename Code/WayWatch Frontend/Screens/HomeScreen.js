import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Bell, Book, User, MapPin } from "lucide-react-native";
import Maps from "./Home/Maps";
import Guide from "./Home/Guide";
import Profile from "./Home/Profile";
import Notifications from "./Home/Notifications";
import { View, TouchableOpacity } from "react-native";

export default function HomeScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;
                    if (route.name === 'Map') IconComponent = MapPin;
                    else if (route.name === 'Notifications') IconComponent = Bell;
                    else if (route.name === 'Guide') IconComponent = Book;
                    else if (route.name === 'Profile') IconComponent = User;

                    return (
                        <View style={{ 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            paddingVertical: 8,
                        }}>
                            <IconComponent 
                                color={focused ? '#4A9EFF' : '#B3B3B3'} 
                                size={24} 
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && (
                                <View style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: '#4A9EFF',
                                    marginTop: 6,
                                }} />
                            )}
                        </View>
                    );
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5E5',
                    paddingBottom: 10,
                    paddingTop: 10,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        style={[
                            props.style,
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        ]}
                        activeOpacity={1} // This removes the dark circle/press effect
                    />
                ),
                headerShown: false,
            })}
        >
            <Tab.Screen name="Map" component={Maps} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Guide" component={Guide} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}