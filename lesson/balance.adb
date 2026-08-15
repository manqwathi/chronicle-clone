-- LESSON/BALANCE.ADB v1.1 - Viewport Boundary & Integrity Monitor
with Ada.Text_IO;
with Ada.Strings.Unbounded;
use Ada.Text_IO;
use Ada.Strings.Unbounded;

procedure Balance is
   type Canvas_ID_Type is (Canvas_Geometric_Plot, Canvas_Freedom_Sandbox);
   type Viewport_Window_State is (Inline_Dashboard, Fullscreen_Popup_Window);
   
   type Canvas_Metric_Record is record
      Identity       : Canvas_ID_Type;
      Dimension_W    : Integer;
      Dimension_H    : Integer;
      Is_Unlocked    : Boolean;
      Window_Display : Viewport_Window_State;
      Payload_Size   : Integer;
   end record;

   procedure Check_Canvas_Stability(Target : Canvas_Metric_Record) is
   begin
      if Target.Dimension_W <= 0 or Target.Dimension_H <= 0 then
         Put_Line("[ADA CORE EXCEPTION] Out of bounds viewport canvas dimensions tracked!");
         return;
      end if;

      if Target.Identity = Canvas_Freedom_Sandbox and then not Target.Is_Unlocked then
         if Target.Window_Display = Fullscreen_Popup_Window then
            Put_Line("[ADA ALERT CRITICAL] Halted: Canvas 2 maximized before quiz clear!");
            return;
         end if;
      end if;

      Put_Line("[ADA VERIFIED] " & Canvas_ID_Type'Image(Target.Identity) & 
               " Display: " & Viewport_Window_State'Image(Target.Window_Display) &
               " | Res: " & Integer'Image(Target.Dimension_W) & "x" & Integer'Image(Target.Dimension_H) & 
               " | Unlocked: " & Boolean'Image(Target.Is_Unlocked) &
               " | Nodes: 0" & Integer'Image(Target.Payload_Size));
   end Check_Canvas_Stability;

   C1 : Canvas_Metric_Record;
   C2 : Canvas_Metric_Record;
begin
   Put_Line("=== INITIALIZING EXPANDED ADA VIEWPORT PROFILE CHECKER ===");

   C1.Identity       := Canvas_Geometric_Plot;
   C1.Dimension_W    := 100;
   C1.Dimension_H    := 100;
   C1.Is_Unlocked    := True;
   C1.Window_Display := Fullscreen_Popup_Window;
   C1.Payload_Size   := 3;

   C2.Identity       := Canvas_Freedom_Sandbox;
   C2.Dimension_W    := 400;
   C2.Dimension_H    := 120;
   C2.Is_Unlocked    := True;
   C2.Window_Display := Inline_Dashboard;
   C2.Payload_Size   := 1;

   Check_Canvas_Stability(C1);
   Check_Canvas_Stability(C2);
   
   Put_Line("=== MULTI-CANVAS STABILITY PROFILE EXECUTED: SAFE AND BALANCED ===");
end Balance;

-- LESSON/BALANCE.ADB v2.0 - Fullscreen Pop-Up & Chore Validation Engine
with Ada.Text_IO;
with Ada.Strings.Unbounded;
use Ada.Text_IO;
use Ada.Strings.Unbounded;

procedure Balance is
   type Canvas_ID_Type is (Canvas_Geometric_Plot, Canvas_Freedom_Sandbox);
   type Viewport_Window_State is (Inline_Dashboard, Fullscreen_Popup_Window);
   type Operational_Cycle is (Active_Duty_Mode, Sleep_Cycle_Power_Save);
   
   type Canvas_Metric_Record is record
      Identity       : Canvas_ID_Type;
      Dimension_W    : Integer;
      Dimension_H    : Integer;
      Is_Unlocked    : Boolean;
      Window_Display : Viewport_Window_State;
      Active_Cycle   : Operational_Cycle;
   end record;

   procedure Check_Canvas_Stability(Target : Canvas_Metric_Record) is
   begin
      if Target.Dimension_W <= 0 or Target.Dimension_H <= 0 then
         Put_Line("[ADA CORE EXCEPTION] Out of bounds viewport scale bounds tracked!");
         return;
      end if;

      if Target.Active_Cycle = Sleep_Cycle_Power_Save and then Target.Window_Display = Fullscreen_Popup_Window then
         Put_Line("[ADA ALERT CRITICAL] Restricted Viewport Shift: Modals disabled during Bedtime Sleep Cycle!");
         return;
      end if;

      Put_Line("[ADA VERIFIED] " & Canvas_ID_Type'Image(Target.Identity) & 
               " Mode: " & Viewport_Window_State'Image(Target.Window_Display) &
               " | Cycle: " & Operational_Cycle'Image(Target.Active_Cycle) &
               " | Resolution: " & Integer'Image(Target.Dimension_W) & "x" & Integer'Image(Target.Dimension_H));
   end Check_Canvas_Stability;

   C1 : Canvas_Metric_Record;
   C2 : Canvas_Metric_Record;
begin
   Put_Line("=== INITIALIZING TWO-CANVAS ADAPTIVE VIEWPORT AUDITOR ===");

   C1.Identity       := Canvas_Geometric_Plot;
   C1.Dimension_W    := 100;
   C1.Dimension_H    := 100;
   C1.Is_Unlocked    := True;
   C1.Window_Display := Fullscreen_Popup_Window;
   C1.Active_Cycle   := Active_Duty_Mode;

   C2.Identity       := Canvas_Freedom_Sandbox;
   C2.Dimension_W    := 400;
   C2.Dimension_H    := 120;
   C2.Is_Unlocked    := True;
   C2.Window_Display := Inline_Dashboard;
   C2.Active_Cycle   := Sleep_Cycle_Power_Save; -- Simulated Bedtime trigger state

   Check_Canvas_Stability(C1);
   Check_Canvas_Stability(C2);
   
   Put_Line("=== VIEWPORT MANAGEMENT AND ASYLUM TIME ALIGNMENT VALIDATED ===");
end Balance;
