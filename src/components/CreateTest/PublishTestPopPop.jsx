import { Check, Circle, ClipboardList, Globe, Info, Sparkle, Triangle } from "lucide-react";
import { Dialog } from "../ui/dialog"   ;
import { DialogContent } from "../ui/dialog";

export default function PublishTestPopPop({visiblity="public"}) {
  return (
    <>
      <Dialog open={true}>
        <DialogContent showCloseButton={false} className={"flex flex-col w-auto sm:max-w-auto h-[90vh] bg-background"}>
          {visiblity === "public" ?
            <main
            className=" text-foreground scrollbar-thumb-muted-foreground      rounded-3xl scrollbar-thin shadow-2xl overflow-hidden relative animate-in fade-in zoom-in  duration-300 overflow-y-auto"
          >
            {/* Close Button (Top Right) */}
            <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <i className="w-6 h-6" data-lucide="x" />
            </button>
            {/* BEGIN: Modal Content Padding */}
            <div className="p-8 md:p-12">
              {/* BEGIN: Header Illustration */}
              <div className="flex justify-center mb-8 relative">
                {/* Simplified representation of the central illustration */}
                <div className="relative">
                  {/* Background Confetti Shapes (Visual Flair) */}
                  <div className="absolute -top-4 -left-8 text-purple-400 animate-pulse">
                      <Sparkle size={20}/>
                  </div>
                  <div className="absolute top-4 -right-12 text-yellow-400">
                      <Circle size={16}/>
                  </div>
                  <div className="absolute bottom-0 -left-12 text-green-400">
                      <Triangle/>
                  </div>
                  {/* Main Clipboard Icon Container */}
                  <div className="w-32 h-32 bg-secondary rounded-2xl flex items-center justify-center relative animate-float">
                    <div className="w-24 h-24 bg-card border-4 border-muted-foreground rounded-xl shadow-inner flex items-center justify-center relative">

                        <ClipboardList className="text-primary" size={48}/>
                      {/* Success Checkmark Overlay */}
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full border-4 border-white">
                          <Check size={24}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Header Illustration */}
              {/* BEGIN: Text Content */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  Test Submitted for Approval!
                </h1>
                <p className="text-muted-foreground text-lg">
                  Your test has been submitted successfully and is now waiting
                  for admin approval.
                </p>
              </div>
              {/* END: Text Content */}
              {/* BEGIN: Public Notice Box */}
              <div className="bg-card border border-purple-100 rounded-2xl p-5 flex items-start gap-4 mb-10">
                <div className="bg-primary text-primary-foreground p-2 rounded-xl shrink-0">
                    <Info  size={20} />
                </div>
                <div>
                  <h4 className=" text-primary mb-1">
                    Public tests require admin approval
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Once approved by an administrator, your test will become
                    publicly available to all students.
                  </p>
                </div>
              </div>
              {/* END: Public Notice Box */}
              {/* BEGIN: Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Visibility */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-primary">
                      <Globe size={24}/>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Visibility</p>
                    <p className="font-bold text-primary">Public</p>
                  </div>
                </div>
                {/* Approval Status */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <i className="w-6 h-6" data-lucide="user-check" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Approval Status</p>
                    <p className="font-bold text-orange-500">Pending</p>
                  </div>
                </div>
                {/* Publish Status */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <i className="w-6 h-6" data-lucide="file-text" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Publish Status</p>
                    <p className="font-bold text-blue-500">Draft</p>
                  </div>
                </div>
                {/* Submitted At */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                    <i className="w-6 h-6" data-lucide="calendar" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Submitted At</p>
                    <p className="font-bold text-slate-800">
                      27 Jul 2026, 03:45 PM
                    </p>
                  </div>
                </div>
              </div>
              {/* END: Status Grid */}
              {/* BEGIN: Secondary Info Box */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-4 mb-10">
                <div className="text-amber-500 shrink-0">
                  <i className="w-6 h-6" data-lucide="lightbulb" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  You can still edit your test while it's waiting for approval.
                  <br />
                  We'll notify you once an admin reviews your test.
                </p>
              </div>
              {/* END: Secondary Info Box */}
              {/* BEGIN: Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <i className="w-5 h-5" data-lucide="briefcase" />
                  Go to My Tests
                </button>
                <button className="flex-1 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <i className="w-5 h-5" data-lucide="check-circle-2" />
                  Close
                </button>
              </div>
              {/* END: Action Buttons */}
            </div>
            {/* END: Modal Content Padding */}
          </main>:""}
        </DialogContent>
      </Dialog>
    </>
  );
}
