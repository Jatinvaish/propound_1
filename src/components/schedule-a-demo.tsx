'use client';
import { createContext, useContext, useState, ReactNode } from "react";
import MultiStepForm  from "@/components/ui/schedule-a-demo";

type ScheduleADemoContextType = {
  openMultiStepForm: () => void;
  closeMultiStepForm: () => void;
};

const ScheduleADemoContext = createContext<ScheduleADemoContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMultiStepForm = () => setIsModalOpen(true);
  const closeMultiStepForm = () => setIsModalOpen(false);

  return (
    <ScheduleADemoContext.Provider value={{ openMultiStepForm, closeMultiStepForm }}>
      {children}
      <MultiStepForm isOpen={isModalOpen} onClose={closeMultiStepForm} />
    </ScheduleADemoContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(ScheduleADemoContext);
  
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  
  return context;
}