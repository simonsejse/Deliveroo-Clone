import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { LocationMarkerIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import { getColorFromRating } from '../utils';

const RestaurantCard = (props) => {
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className='bg-white mr-3 shadow rounded-md w-64'
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='h-36 w-64 rounded-sm'
      />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>
        <View className='flex-row items-center space-x-1'>
          <StarIcon color={`${getColorFromRating(rating)}`} opacity={0.5} />
          <Text className='text-xs text-gray-500'>
            <Text className={`text-${getColorFromRating(rating)}-500`}>
              {rating}
            </Text>{' '}
            · genre
          </Text>
        </View>
        <View className='flex-row items-center space-x-1 flex-wrap'>
          <LocationMarkerIcon color='gray' size={22} opacity={0.4} />
          <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
