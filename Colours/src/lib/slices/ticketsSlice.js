import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  eventId: null,
  tickets: {
    adults: 0,
    children: 0,
    freeAdults: 0,
    freeChildren: 0,
  },
  prices: {
    adults: 65000,
    children: 32500,
    freeAdults: 0,
    freeChildren: 0,
    serviceCharge: 2600,
  },
  paymentMethod: "mercadopago",
  hasTickets: false,
}

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setEventId: (state, action) => {
      state.eventId = action.payload
    },
    updateTicketCount: (state, action) => {
      const { type, count } = action.payload
      state.tickets[type] = Math.max(0, count)
    },
    incrementTicket: (state, action) => {
      const type = action.payload
      state.tickets[type] += 1
    },
    decrementTicket: (state, action) => {
      const type = action.payload
      if (state.tickets[type] > 0) {
        state.tickets[type] -= 1
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    completePayment: (state) => {
      state.hasTickets = true
    },
    resetTickets: (state) => {
      state.tickets = initialState.tickets
      state.hasTickets = false
    },
  },
})

// Selectors
export const selectEventId = (state) => state.tickets.eventId
export const selectTickets = (state) => state.tickets.tickets
export const selectPrices = (state) => state.tickets.prices
export const selectPaymentMethod = (state) => state.tickets.paymentMethod
export const selectHasTickets = (state) => state.tickets.hasTickets

// Calculate derived data
export const selectSubtotal = (state) => {
  const { tickets, prices } = state.tickets
  return (
    tickets.adults * prices.adults +
    tickets.children * prices.children +
    tickets.freeAdults * prices.freeAdults +
    tickets.freeChildren * prices.freeChildren
  )
}

export const selectTotal = (state) => {
  return selectSubtotal(state) + state.tickets.prices.serviceCharge
}

export const {
  setEventId,
  updateTicketCount,
  incrementTicket,
  decrementTicket,
  setPaymentMethod,
  completePayment,
  resetTickets,
} = ticketsSlice.actions

export default ticketsSlice.reducer

