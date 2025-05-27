<template>
  <div class="max-w-3xl mx-auto p-6 py-32">
    <h1 class="text-3xl font-semibold mb-2 text-gray-800">FAQs</h1>
    <p class="mb-6 text-gray-600">Some frequently asked questions that you may find useful!</p>

    <!-- Payment Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-medium mb-4 text-gray-800">Payment</h2>
      <el-collapse v-model="activePayment" accordion>
        <el-collapse-item title="Mandatory licensing fee for visitors / new cost: US $20.50" name="1">
          <p>All visitors to the Cayman Islands who intend to drive are required to purchase a Visitor’s Driving Permit (one-time charge) &ndash; except individuals who hold a valid International Driver’s License. The fee is US$20.50 per person.</p>
        </el-collapse-item>
        <el-collapse-item title="Payment Methods" name="2">
          <p>Debit card (where VISA or MasterCard logo is not visible on card) requires a deposit of US$500 plus the full amount of rental charges at time of pickup. These rentals require renter to accept Economy/Discount Deductible Vehicle Coverage. If the renter declines the insurance coverage, a US$1000 deposit will be required plus the estimated rental charge.</p>
        </el-collapse-item>
        <el-collapse-item title="Deposit Requirements" name="3">
          <p>Debit card (where VISA or MasterCard logo is not visible on card) requires a deposit of US$500 plus the full amount of rental charges at time of pickup. These rentals require renter to accept Economy/Discount Deductible Vehicle Coverage. If the renter declines the insurance coverage, a US$1000 deposit will be required plus the estimated rental charge.</p>
        </el-collapse-item>
      </el-collapse>
    </section>

    <!-- Preparation Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-medium mb-4 text-gray-800">Preparation</h2>
      <el-collapse v-model="activePreparation" accordion>
        <el-collapse-item title="Will I need to refuel?" name="1">
          <p>Customers may refuel the vehicle to the same fuel level upon picking up the vehicle.<br />If a customer chooses not to refuel the vehicle to the same fuel level, they will be charged the local economy rate which is typically above the local pump price. A full tank of gas is not guaranteed.</p>
        </el-collapse-item>
        <el-collapse-item title="Can I rent a van?" name="2">
          <p>Yes, you can rent 9 or 12 passenger vans from us if you are at least 25 years old.</p>
        </el-collapse-item>
        <el-collapse-item title="How can I get a copy of my receipt?" name="3">
          <p>If you cannot locate your receipt, review your rental contract to confirm the license number and name match your entry.</p>
          <p>For rentals more than six months ago, please contact the office you rented from to request a copy.</p>
          <p>For rentals within the last six months, call <a href="tel:1-345-949-9550" class="text-blue-600 underline">1-345-949-9550</a> or contact the renting location directly.</p>
        </el-collapse-item>
      </el-collapse>
    </section>

    <!-- Reservation Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-medium mb-4 text-gray-800">Reservation</h2>
      <el-collapse v-model="activeReservation" accordion>
        <el-collapse-item title="Where are you located?" name="1">
          <p>Economy/Discount Car Rental is located outside the Airport Terminal. Just follow the sidewalk left and cross the road into the Airport Plaza. You will see our rental office directly ahead.</p>
        </el-collapse-item>
        <el-collapse-item title="Do you offer a refund policy?" name="2">
          <p>You have 24 hours prior to booking to cancel without any penalties; otherwise, the deposit will be forfeited.</p>
        </el-collapse-item>
      </el-collapse>
    </section>

    <!-- General Info Section -->
    <section>
      <h2 class="text-2xl font-medium mb-4 text-gray-800">General Info</h2>
      <el-collapse v-model="activeGeneral" accordion>
        <el-collapse-item title="Cayman Islands FAQ" name="1">
          <p><a href="http://www.caymanislands.ky/askalocal/faq.aspx" target="_blank" rel="noopener" class="text-blue-600 underline">http://www.caymanislands.ky/askalocal/faq.aspx</a></p>
        </el-collapse-item>
        <el-collapse-item title="Cayman Islands Discounts FAQ" name="2">
          <p><a href="https://www.caymanislandsdiscounts.com/faq.htm" target="_blank" rel="noopener" class="text-blue-600 underline">https://www.caymanislandsdiscounts.com/faq.htm</a></p>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'

const activePayment = ref([])
const activePreparation = ref([])
const activeReservation = ref([])
const activeGeneral = ref([])
</script>

<style scoped>
.prose ul {
  margin-top: 0.5rem;
}
</style>
