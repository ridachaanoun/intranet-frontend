<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
    <div class="bg-surface rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 class="text-lg font-semibold text-text-primary">Assign Points</h3>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <div v-if="student" class="mb-6 flex items-center">
          <div class="flex-shrink-0 h-12 w-12 mr-4">
            <img 
              class="h-12 w-12 rounded-full object-cover" 
              :src="student.avatar || 'https://ui-avatars.com/api/?name=' + student.name" 
              alt="" 
            />
          </div>
          <div>
            <div class="font-medium text-text-primary">{{ student.name }}</div>
            <div class="text-sm text-text-secondary">Current Points: {{ student.points || 0 }}</div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Points to Award</label>
            <input 
              type="number" 
              v-model="pointsToAdd"
              min="1" 
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-text-primary"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Reason (optional)</label>
            <select 
              v-model="reason" 
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-text-primary"
            >
              <option value="Participation">Participation</option>
              <option value="Good Performance">Good Performance</option>
              <option value="Helping Others">Helping Others</option>
              <option value="Task Completion">Task Completion</option>
              <option value="Extra Effort">Extra Effort</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div v-if="reason === 'Other'">
            <label class="block text-sm font-medium text-text-secondary mb-1">Custom Reason</label>
            <input 
              type="text" 
              v-model="customReason"
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-text-primary"
              placeholder="Enter reason"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Note (optional)</label>
            <textarea 
              v-model="note"
              rows="3" 
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-text-primary resize-none"
              placeholder="Add a note..."
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="px-6 py-4 bg-background-element flex justify-end space-x-3">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 border border-background-element rounded-md hover:bg-surface-hover text-text-secondary transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="assignPoints" 
          :disabled="!isFormValid"
          :class="{'opacity-50 cursor-not-allowed': !isFormValid}"
          class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-md hover:from-primary-700 hover:to-primary-800 transition-colors shadow-sm"
        >
          Assign Points
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'points-assigned']);

// Form state
const pointsToAdd = ref(5);
const reason = ref('Participation');
const customReason = ref('');
const note = ref('');

// Validation
const isFormValid = computed(() => {
  return pointsToAdd.value > 0 && 
         (reason.value !== 'Other' || (reason.value === 'Other' && customReason.value.trim() !== ''));
});

// Submit the form
const assignPoints = () => {
  if (!isFormValid.value) return;
  
  const finalReason = reason.value === 'Other' ? customReason.value : reason.value;
  
  emit('points-assigned', {
    student: props.student,
    points: pointsToAdd.value,
    reason: finalReason,
    note: note.value,
    timestamp: new Date()
  });
};
</script>
