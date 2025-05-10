
// Definição dos tipos principais do sistema

export type UserRole = "admin" | "barber" | "client";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending",
  CONFIRMED = "confirmed"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
}

export interface Barbershop {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  ownerId: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  barbershopId: string;
  position: string;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // em minutos
  barbershopId: string;
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  serviceId: string;
  serviceName: string;
  barbershopId: string;
  date: Date;
  status: AppointmentStatus;
  price: number;
}

export type PlanType = "Starter" | "Essencial" | "Pro" | "Empresarial";

export interface Plan {
  id: string;
  name: PlanType;
  price: number;
  description: string;
  appointmentLimit: number | null; // null significa ilimitado
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: PlanType;
  startDate: Date;
  endDate?: Date;
  status: "active" | "cancelled" | "expired";
  appointmentsUsed: number;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  date: Date;
  status: "pending" | "completed" | "failed";
}

// Tipo para chart tooltip
export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}
