import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ZoomIn, MessageSquare, FileText, Eye, RotateCcw } from "lucide-react";

export default function ClientContract() {
  const [currentStep, setCurrentStep] = useState<"approve" | "sign">("approve");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">PICSTUDIO</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold">Sample Client Contract</div>
              <div className="text-sm text-muted-foreground">N° 07554356</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Preview */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="relative">
              <CardContent className="p-4">
                <div className="bg-gradient-to-b from-blue-50 to-white border rounded-lg p-6 min-h-[400px] relative">
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4 mt-8">
                    <div className="flex items-center justify-center">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Logo</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold text-lg">LOGO HERE</div>
                      <div className="text-sm text-muted-foreground">TAGLINE GOES HERE</div>
                    </div>

                    <div className="mt-8 space-y-1 text-sm">
                      <div className="font-semibold">John Smooth</div>
                      <div>Chief Executive</div>
                      <div>69 Ubi Harbourfront Road Singapore 408909</div>
                      <div>📧 email@mail.com www.myyweb.com</div>
                      <div>📞 +886 - 12345 - 6789</div>
                    </div>

                    <div className="text-right text-sm mt-12">
                      Date: 10 September, 2018
                    </div>

                    <div className="text-left text-xs space-y-2 mt-8">
                      <p>This is a sample letter that has been placed to demonstrate typing remat (Your Company) letterhead design...</p>
                      <p>This letterhead design is meant project an image of professionalism reliability...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="bg-gradient-to-b from-blue-50 to-white border rounded-lg p-6 min-h-[300px] relative">
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="text-xs space-y-2">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                    </div>
                    
                    <div className="flex justify-center gap-8 mt-8 text-xs">
                      <div className="text-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                        <div>📍</div>
                        <div>9020 Bourbon Street</div>
                        <div>Bakersfield, CA 90210</div>
                      </div>
                      <div className="text-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                        <div>📱</div>
                        <div>Tel: +345-8760</div>
                        <div>Fax: +345-8750</div>
                      </div>
                      <div className="text-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                        <div>✉️</div>
                        <div>info@websites.com</div>
                        <div>www.websites.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {currentStep === "approve" && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center space-y-4">
                <div className="bg-white/20 text-white px-3 py-1 rounded text-sm w-fit mx-auto">Logo</div>
                <h2 className="text-2xl font-bold">Hello Lionel,</h2>
                <p className="text-lg">Veuillez examiner et signer cette facture</p>
                
                <Card className="bg-white text-black mt-8">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <div className="font-semibold">Devis N° 1867</div>
                        <div className="text-muted-foreground">
                          FROM: Lionel Feugana | TO: Sample Client
                        </div>
                        <div className="text-muted-foreground">www.picstudio.com</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">LOGO HERE</div>
                        <div className="text-sm font-semibold">TAGLINE GOES HERE</div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                          <div className="font-semibold mb-2">John Smooth</div>
                          <div>Chief Executive</div>
                          <div>69 Ubi Harbourfront Road Singapore 408909</div>
                          <div>📧 email@mail.com www.myyweb.com</div>
                          <div>📞 +886 - 12345 - 6789</div>
                        </div>
                        <div className="text-right">
                          <div>Date: 10 September, 2018</div>
                        </div>
                      </div>

                      <div className="mt-6 text-xs space-y-2">
                        <p>This is a sample letter that has been placed to demonstrate typing remat (Your Company) letterhead design. When positioned properly, it will serve to work in harmony with all other elements letterhead.</p>
                        <p>This letterhead design is meant project an image of</p>
                        <p>This letterhead design is meant project an image of professionalism reliability. By using simple align we have created a very spacious feeling. The simplicity suggest: reingtthe spaciousness contributes h aesthetics the layout. These basic qualities along with the (Your Company)</p>
                        <p>look and helps reinforce the (Your Company) brand. letterhead design is meant to project an image p design. When positioned properly, it will serve to work in harmony all the other elements letterhead. simulation and reliability.</p>
                        <p>This letterhead design is based on the theme of your logo) from (Your Company) logo. Each stationary we have created a very spacious feeling. The simplicity suggest: strength the spaciousness contributes part of the theme of your logo).</p>
                      </div>

                      <div className="flex justify-center gap-8 mt-8 text-xs">
                        <div className="text-center">
                          <div>📍</div>
                          <div>9020 Bourbon Street</div>
                          <div>Bakersfield, CA 90210</div>
                        </div>
                        <div className="text-center">
                          <div>📱</div>
                          <div>Tel: +345-8760</div>
                          <div>Fax: +345-8750</div>
                        </div>
                        <div className="text-center">
                          <div>✉️</div>
                          <div>info@websites.com</div>
                          <div>www.websites.com</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-xs text-muted-foreground mb-4">0 words</div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="bg-green-500 text-white border-green-500 hover:bg-green-600 px-8">
                    Accepter
                  </Button>
                  <Button variant="outline" className="bg-red-500 text-white border-red-500 hover:bg-red-600 px-8">
                    Refuser
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "sign" && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center space-y-4">
                <div className="bg-white/20 text-white px-3 py-1 rounded text-sm w-fit mx-auto">Logo</div>
                <h2 className="text-2xl font-bold">Hello Lionel,</h2>
                <p className="text-lg">Veuillez examiner et signer ce contrat</p>
                
                <Card className="bg-white text-black mt-8">
                  <CardContent className="p-4">
                    {/* Same content as approve step */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <div className="font-semibold">Devis N° 1867</div>
                        <div className="text-muted-foreground">
                          FROM: Lionel Feugana | TO: Sample Client
                        </div>
                        <div className="text-muted-foreground">www.picstudio.com</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Document content same as above */}
                    <div className="border rounded-lg p-4 mb-6">
                      {/* Same content */}
                    </div>

                    <div className="text-center text-xs text-muted-foreground mb-4">0 words</div>
                  </CardContent>
                </Card>

                <Button className="bg-blue-600 hover:bg-blue-700 px-12 py-3 text-lg">
                  Signer le document
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Toggle between steps for demo */}
        <div className="flex justify-center gap-4">
          <Button 
            variant={currentStep === "approve" ? "default" : "outline"}
            onClick={() => setCurrentStep("approve")}
          >
            Vue Approbation
          </Button>
          <Button 
            variant={currentStep === "sign" ? "default" : "outline"}
            onClick={() => setCurrentStep("sign")}
          >
            Vue Signature
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}