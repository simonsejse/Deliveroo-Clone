import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/features/restaurantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../slices/features/basketSlice';

import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className='rounded-full bg-gray-100 absolute top-3 right-5'
            onPress={navigation.goBack}
          >
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className='w-7 h-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1 text-center'>Udlever om 25-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Skift</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className='flex-row items-center space-x-3 bg-white py-2 px-5'
            >
              <Text className='text-[#00CCBB]'>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className='w-12 h-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>
                <Currency quantity={items[0]?.price} currency='DKK' />
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className='text-[#00CCBB] text-xs'
                >
                  Fjern
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='bg-white p-5 mt-5 space-y-4'>
          <View className='flex-row'>
            <Text className='flex-1 text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={total} currency='DKK' />
            </Text>
          </View>
          <View className='flex-row'>
            <Text className='flex-1 text-gray-400'>Delivery fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={5.99} currency='DKK' />
            </Text>
          </View>
          <View className='flex-row'>
            <Text className='flex-1'>Order Total</Text>
            <Text className='text-black font-extrabold'>
              <Currency quantity={total + 5.99} currency='DKK' />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrder')}
            className='bg-[#00CCBB] p-4 rounded-lg'
          >
            <Text className='text-center text-lg text-white font-extrabold'>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
