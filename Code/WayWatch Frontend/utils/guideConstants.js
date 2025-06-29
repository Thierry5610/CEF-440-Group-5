import theme from '../styles/theme';

// Learning data
export const LEARNING_DATA = [
  {
    id: '1',
    title: 'Stop Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://media.istockphoto.com/id/486744506/vector/stop-sign-vector.jpg?s=612x612&w=0&k=20&c=ibvthRQWTgcSt2R9EaqCb8WvmSYJHBQXDCPr8C9qLj8=',
    isFavorite: false,
    difficulty: 'Beginner',
    duration: '5 min read',
    description: 'Instructs drivers to stop and ensure the intersection is clear before proceeding.',
    importance: [
      { 
        text: 'The stop sign requires all drivers to come to a complete stop before proceeding.', 
        icon: 'https://media.istockphoto.com/id/1307624581/vector/stop-sign-with-hand-icon-info-graphics-vector-graphics.jpg?s=612x612&w=0&k=20&c=zNQnBw8lYqiOJ4DAx336gcNhYQRE0b_xelUpQKk8Rs0=' 
      },
      { 
        text: 'Usually placed at intersections, visible from a distance to allow time for stopping.', 
        icon: 'https://media.istockphoto.com/id/1283851574/vector/attention-sign-stop-sign.jpg?s=612x612&w=0&k=20&c=01ZHWFnIX21fuBG9s3oiN066gg1NkIxw14DRKhIKcMk=' 
      },
      { 
        text: 'Instructs drivers to stop and ensure the intersection is clear before proceeding.', 
        icon: 'https://media.istockphoto.com/id/1151657492/vector/vector-red-prohibition-sign-no-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=UhU_DVZGc-HnEeMayjUllgdrhYdvfUpDYPRaxFaHwmk=' 
      }
    ]
  },
  {
    id: '2',
    title: 'Yield Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://media.istockphoto.com/id/520973070/vector/yield-sign.jpg?s=612x612&w=0&k=20&c=KxHolhy5z-JtUXyu2pbjZsP3XMQxKVeKSZC5Jp41TJk=',
    isFavorite: true,
    difficulty: 'Beginner',
    duration: '3 min read',
    description: 'Instructs drivers to give right-of-way to other vehicles or pedestrians.',
    importance: [
      { 
        text: 'The yield sign indicates that drivers must prepare to stop if necessary to let a driver on another approach proceed.', 
        icon: 'https://media.istockphoto.com/id/1972577301/vector/yield-traffic-sign.jpg?s=612x612&w=0&k=20&c=6d_1L7-iWsUUWk60lU9H5DZfPthoNB5Dw-ukg_2h9oU=' 
      },
      { 
        text: 'Visible as you approach intersections, alerting drivers to prepare to yield.', 
        icon: 'https://media.istockphoto.com/id/1307758886/vector/triangular-traffic-signal-in-white-and-red-isolated-on-white-background-mandatory-give-way.jpg?s=612x612&w=0&k=20&c=4vmv2c6tD3D-3KOrEcSLH9lKgJ8t8B0MotJ_KfsuGhM=' 
      },
      { 
        text: 'Instructs drivers to give right-of-way to other vehicles or pedestrians.', 
        icon: 'https://media.istockphoto.com/id/1036713280/vector/priority-road-sign-and-give-way-sign-vector.jpg?s=612x612&w=0&k=20&c=9K2etbXopsc2jyRwxDYRybZl5T8ehFFLnYU8rEKGYh4=' 
      }
    ]
  },
  {
    id: '3',
    title: 'Animal Crossing',
    category: 'Road Signs',
    subcategory: 'Warning',
    image: 'https://media.istockphoto.com/id/165956622/vector/kangaroo-crossing-sign.jpg?s=612x612&w=0&k=20&c=LyeTc9QOnGSxWP-m-YnTNCf1rX3Tf89UQM-g_wrsHBY=',
    isFavorite: true,
    difficulty: 'Beginner',
    duration: '4 min read',
    description: 'Advises drivers to slow down and stay alert for animals on the road.',
    importance: [
      { 
        text: 'Animal crossing signs warn drivers to watch for animals entering the roadway.', 
        icon: 'https://media.istockphoto.com/id/165956622/vector/kangaroo-crossing-sign.jpg?s=612x612&w=0&k=20&c=LyeTc9QOnGSxWP-m-YnTNCf1rX3Tf89UQM-g_wrsHBY=' 
      },
      { 
        text: 'Usually placed near forests or countryside areas where animal crossings are frequent.', 
        icon: 'https://media.istockphoto.com/id/115983057/photo/koala-warning-sign.jpg?s=612x612&w=0&k=20&c=-ovRYduMxpsBEf9Yr2EvAXDwMcC1Oc6bVQQFQPsf-jY=' 
      },
      { 
        text: 'Advises drivers to slow down and stay alert for animals on the road.', 
        icon: 'https://media.istockphoto.com/id/487003018/photo/deer-crossing-in-canada.jpg?s=612x612&w=0&k=20&c=mPSo7HJmbyyI_uDP5MgywOvE9AN-fzFMZX4WmeZC4mk=' 
      }
    ]
  },
  {
    id: '4',
    title: 'No U-Turn',
    category: 'Road Signs',
    subcategory: 'Prohibition',
    image: 'https://media.istockphoto.com/id/1207567645/vector/u-turn-forbidden-road-sign.jpg?s=612x612&w=0&k=20&c=3NS7a31_qOIJDvtuaaF828AvIld0P7MJjZQKug-RBwA=',
    isFavorite: false,
    difficulty: 'Intermediate',
    duration: '5 min read',
    description: 'Instructs drivers that U-turns are not allowed to ensure smooth traffic flow.',
    importance: [
      { 
        text: 'Indicates that making a U-turn at this location is prohibited.', 
        icon: 'https://media.istockphoto.com/id/1480909666/vector/no-u-turn-sign-forbidden-turn-back-icon-no-u-turn-sign-for-traffic-symbol-outline-icon.jpg?s=612x612&w=0&k=20&c=G5U6E7gdTe5u4Xtg7xb2z82H5lQIKnqWJFW3F77DMxY=' 
      },
      { 
        text: 'Usually positioned where U-turns could disrupt traffic or pose a danger.', 
        icon: 'https://media.istockphoto.com/id/2163465612/vector/no-u-turn-sign.jpg?s=612x612&w=0&k=20&c=QvTbUVaSaoOfhIhpafAUwSbVWM-hi4Q0dUhdTh-ofBc=' 
      },
      { 
        text: 'Instructs drivers that U-turns are not allowed to ensure smooth traffic flow.', 
        icon: 'https://media.istockphoto.com/id/538099001/photo/no-left-or-u-turn.jpg?s=612x612&w=0&k=20&c=mBYVoGLQuDgrRg6ZCZbvp5aGStQsTmHR_u5hT4PF0_k=' 
      }
    ]
  },
  {
    id: '5',
    title: 'Construction Zone',
    category: 'Road Signs',
    subcategory: 'Temporary',
    image: 'https://media.istockphoto.com/id/1132069677/vector/construction-site-sign-caution-construction-works-traffic-sign.jpg?s=612x612&w=0&k=20&c=riR3z5NYCAMgez94IwPUpQZwQL_5_RwkCUkMb-71Qlw=',
    isFavorite: false,
    difficulty: 'Intermediate',
    duration: '6 min read',
    description: 'Indicates the presence of a construction area requiring reduced speed and increased caution.',
    importance: [
      { 
        text: 'Warns drivers of road work ahead and the presence of workers or equipment.', 
        icon: 'https://media.istockphoto.com/id/1468856154/vector/road-works-sign-attention-road-works-are-underway-warning-sign-yellow-triangle.jpg?s=612x612&w=0&k=20&c=PoUDITzCQMqosx-iBxK8HH1Kc8Ojc4nbFedasqP64o8=' 
      },
      { 
        text: 'Placed well before the construction zone to give drivers time to slow down or change lanes.', 
        icon: 'https://media.istockphoto.com/id/1411524602/vector/general-isolated-road-sign-with-silhouette-man-working-for-road-work-icon-button-board.jpg?s=612x612&w=0&k=20&c=dMBwl6CzWHJD3U-1OZPoOUWErZ2C5Rg7WoSAV8eJxqw=' 
      },
      { 
        text: 'Indicates the presence of a construction area requiring reduced speed and increased caution.', 
        icon: 'https://media.istockphoto.com/id/1132069677/vector/construction-site-sign-caution-construction-works-traffic-sign.jpg?s=612x612&w=0&k=20&c=riR3z5NYCAMgez94IwPUpQZwQL_5_RwkCUkMb-71Qlw=' 
      }
    ]
  }
];

// Categories
export const CATEGORIES = ['All', 'Regulatory', 'Warning', 'Informational', 'Temporary', 'Prohibition'];

// Difficulty color mapping
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': 
      return theme.colors.success[500];
    case 'Intermediate': 
      return theme.colors.warning[500];
    case 'Advanced': 
      return theme.colors.error[500];
    default: 
      return theme.colors.success[500];
  }
};

// Filter functions
export const filterLearningData = (data, activeTab, selectedCategory, searchQuery, favorites) => {
  return data.filter(item => {
    const matchesTab = activeTab === 'All' || (activeTab === 'Favorite' ? favorites.includes(item.id) : true);
    const matchesCategory = selectedCategory === 'All' || item.subcategory === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'Favorite') {
      return favorites.includes(item.id) && matchesCategory && matchesSearch;
    }
    
    return matchesTab && matchesCategory && matchesSearch;
  });
};

export default {
  LEARNING_DATA,
  CATEGORIES,
  getDifficultyColor,
  filterLearningData,
};