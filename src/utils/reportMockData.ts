
import { format, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Generate array of week days in Portuguese
export const generateWeekDays = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startDate, i);
    return format(day, 'EEE', { locale: ptBR });
  });
};

const weekDays = generateWeekDays();

// Mock data for weekly appointments and revenue
export const mockWeekData = [
  { day: weekDays[0], atendimentos: 8, receita: 320 },
  { day: weekDays[1], atendimentos: 12, receita: 480 },
  { day: weekDays[2], atendimentos: 10, receita: 400 },
  { day: weekDays[3], atendimentos: 15, receita: 600 },
  { day: weekDays[4], atendimentos: 18, receita: 720 },
  { day: weekDays[5], atendimentos: 20, receita: 800 },
  { day: weekDays[6], atendimentos: 5, receita: 200 },
];

// Mock data for services popularity
export const mockServicesData = [
  { name: 'Corte de Cabelo', valor: 40 },
  { name: 'Barba', valor: 25 },
  { name: 'Corte e Barba', valor: 30 },
  { name: 'Degradê', valor: 20 },
  { name: 'Tintura', valor: 10 },
];
