import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';

const CategoryCard = (props) => {
  const { imgUrl, title } = props;
  return (
    <TouchableOpacity className='relative mr-4'>
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='w-20 h-20 rounded'
      />
      <View className='absolute bottom-1 left-1 bg-gray-900 p-0.5 rounded-sm shadow'>
        <Text className='text-white font-bold'>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
