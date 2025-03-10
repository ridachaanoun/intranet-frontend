<template>
    <div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Classrooms Grid -->
        <div class="lg:col-span-2">
          <div>
            <div 
              v-for="classroom in classroomData" 
              :key="classroom.id"
              class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <!-- Cover Image with Gradient Overlay -->
              <div class="relative">
                <a href="#" class="block">
                  <div 
                    class="h-44 bg-cover bg-center bg-no-repeat" 
                    :style="`background-image: url('${classroom.coverImage}')`"
                  >
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                  </div>
                </a>
                <!-- Team Members Photos -->
                <div class="absolute bottom-0 right-0 p-3 flex justify-end space-x-2">
                  <!-- Delegates -->
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Back-up: ${classroom.backupCoach}`"
                  >
                    <img :src="classroom.backupCoachImage" :alt="classroom.backupCoach" class="w-full h-full object-cover">
                  </div>
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Delegate: ${classroom.delegate}`"
                  >
                    <img :src="classroom.delegateImage" :alt="classroom.delegate" class="w-full h-full object-cover">
                  </div>
                  <!-- Trainer -->
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-500 transform hover:scale-110 transition-transform cursor-pointer shadow-glow"
                    :title="`Trainer: ${classroom.coach}`"
                  >
                    <img :src="classroom.coachImage" :alt="classroom.coach" class="w-full h-full object-cover">
                  </div>
                </div>
              </div>
              
              <!-- Card Content -->
              <div class="p-5">
                <a href="#" class="block">
                  <h3 class="text-xl font-semibold text-text-primary mb-3 hover:text-primary-400 transition-colors">
                    {{ classroom.name }}
                  </h3>
                </a>
                
                <!-- Details List -->
                <div class="space-y-2.5 text-sm">
                  <!-- Level -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-arrow-trend-up text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Level</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom.level }}</span>
                  </div>
                  
                  <!-- Coach -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-briefcase text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Coach</span>
                    </div>
                    <span class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom.coach }}
                    </span>
                  </div>
                  
                  <!-- Learners -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-group text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Learners</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom.learners }}</span>
                  </div>
                  
                  <!-- Delegate -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-shield text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Delegate</span>
                    </div>
                    <span class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom.delegate }}
                    </span>
                  </div>
                  
                  <!-- Campus -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-school text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Campus</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom.campus }}</span>
                  </div>
                  
                  <!-- Promotion -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-calendar-check text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Promotion</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom.promotion }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Card Footer -->
              <div class="px-5 py-3 bg-surface-hover flex justify-center">
                <a href="#" class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
                  View Classroom <i class="fas fa-chevron-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Learners List Sidebar -->
        <div class="lg:col-span-1">
          <ProfileClassroomLearners :learners="classroomLearners" />
        </div>
      </div>
    
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProfileClassroomLearners from './ProfileClassroomLearners.vue'
  
  // Props for classroom data
  defineProps({
    classroomData: {
      type: Array,
      required: true
    }
  })
  
  // Learners data for the current classroom
  const classroomLearners = ref([
    {
      id: 1,
      fullName: 'Abdelilah Essemlali',
      username: 'abdelilahessemlali',
      profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg'
    },
    {
      id: 2,
      fullName: 'Abderrahmane Ouabderzaq',
      username: 'abderrahmaneouabderzaq1',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdQLwDqDwd2JfzifvfBTFT8I7iKFFevcedYg&s'
    },
    {
      id: 3,
      fullName: 'Anouar Ech-charai',
      username: 'anouarech-charai',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww'
    },
    {
      id: 4,
      fullName: 'Ayoub Labit',
      username: 'ayoublabit',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbxBmNuEWRnSeavusNsXAJQY-tSNCA7Qr_A&s'
    },
    {
      id: 5,
      fullName: 'Fatima Zahra Naamy',
      username: 'Fatima Zahra NAAMY',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsy3zU6gHCYIgHQ1hKv1ASWQ62U_Jpe3Wdfg&s'
    },
    {
      id: 6,
      fullName: 'Hamza Saâf',
      username: 'Hamza Saâf',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPWOlAuhKyULaKS8h79ORRDh_J4BGFxsN6g&s'
    },
    {
      id: 7,
      fullName: 'Hamza Akroubi',
      username: 'hamzaakroubi',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYA4yTn5sczM4j6psN48F0zJk8zELz2nT4A&s'
    },
    {
      id: 8,
      fullName: 'Isam Chajia',
      username: 'ISAM CHAJIA',
      profileImage: 'https://media.istockphoto.com/id/1388648617/photo/confident-caucasian-young-man-in-casual-denim-clothes-with-arms-crossed-looking-at-camera.jpg?s=612x612&w=0&k=20&c=YxctPklAOJMmy6Tolyvn45rJL3puk5RlKt39FO46ZeA='
    },
    {
      id: 9,
      fullName: 'Ismail Dilali',
      username: 'Ismail Dilali',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTefdAYZ6uy2rn4ODl9zSL1KwCAhiEPo9Xm-g&s'
    },
    {
      id: 10,
      fullName: 'Keltoum Malouki',
      username: 'keltoummalouki',
      profileImage: '/storage/users/profile/thumbnail/1420-1728919464.JPG'
    },
    {
      id: 11,
      fullName: 'Khaoula Benrhebra',
      username: 'KHAOULA BENRHEBRA',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYA4yTn5sczM4j6psN48F0zJk8zELz2nT4A&s'
    },
    {
      id: 12,
      fullName: 'Marouane Bichara',
      username: 'marouanebichara',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPWOlAuhKyULaKS8h79ORRDh_J4BGFxsN6g&s'
    },
    {
      id: 13,
      fullName: 'Mohamed Hmidouch',
      username: 'Mohamed Hmidouch',
      profileImage: '/storage/users/profile/thumbnail/1106-1728560946.jpg'
    },
    {
      id: 14,
      fullName: 'Mohamed Eddahmani',
      username: 'Mohammed Eddahmani',
      profileImage: '/storage/users/profile/thumbnail/1144-1728556800.jpeg'
    },
    {
      id: 15,
      fullName: 'Mohammed Ennaim',
      username: 'mohammedennaim',
      profileImage: '/storage/users/profile/thumbnail/1261-1727966520.JPG'
    },
    {
      id: 16,
      fullName: 'Moukhtari Mohamed',
      username: 'moukhtarimohamed',
      profileImage: '/storage/users/profile/thumbnail/1251-1728310261.jpg'
    },
    {
      id: 17,
      fullName: 'Othman Aboussebaba',
      username: 'othman aboussebaba',
      profileImage: '/storage/users/profile/thumbnail/1115-1727859750.JPG'
    },
    {
      id: 18,
      fullName: 'Sara Tougha',
      username: 'Sara Tougha',
      profileImage: '/storage/users/profile/thumbnail/1351-1727966267.JPG'
    },
    {
      id: 19,
      fullName: 'Youness Ouahmane',
      username: 'YOUNESS OUAHMANE',
      profileImage: '/storage/users/profile/thumbnail/1371-1727966320.JPG'
    },
    {
      id: 20,
      fullName: 'Youssef Er-rouihi',
      username: 'youssefer-rouihi',
      profileImage: '/storage/users/profile/thumbnail/1239-1728310309.jpg'
    },
    {
      id: 21,
      fullName: 'Zakaria El Kahri',
      username: 'zakariaelkahri',
      profileImage: '/storage/users/profile/thumbnail/1500-1728310844.JPG'
    },
    {
      id: 22,
      fullName: 'Zakariae Elmoufid',
      username: 'ZAKARIAE ELMOUFID',
      profileImage: '/storage/users/profile/thumbnail/1130-1727859974.JPG'
    }
  ])
  </script>