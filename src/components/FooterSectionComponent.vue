<script >
export default {
    name: "FooterSectionComponent"

}
</script>
<template>
        <footer class="bg-gray-900 text-white py-12 px-6 relative overflow-hidden">
        <!-- Decorative elements -->
        <i class="fas fa-mug-hot teacup text-amber-200"></i>
        <div class="sparkle text-yellow-300" style="top: 20%; left: 15%;">✦</div>
        <div class="sparkle text-pink-300" style="top: 40%; left: 85%;">✦</div>
        <div class="sparkle text-blue-300" style="top: 70%; left: 25%;">✦</div>
        
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8">
                <div class="mb-6 md:mb-0">
                    <div class="flex items-center animate-rotate" style="animation-duration: 20s">
                        <img class="w-[100px] h-[50px]" src="https://eandrrnqsieuoqnzyiab.supabase.co/storage/v1/object/public/images//image.png" alt="">
                    </div>
                    <p class="mt-4 text-gray-400 max-w-md">សូមអរគុណសម្រាប់ការទស្សនារបស់អ្នក។ យើងសង្ឃឹមថាអ្នកនឹងរីករាយជាមួយនឹងវគ្គសិក្សារបស់យើង។</p>
                    <p class="mt-2 text-gray-400">(Thank you for visiting. We hope you enjoy our courses.)</p>
                </div>
                <div class="flex space-x-6">
                    <a href="#" class="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-icon w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            
            <div class="border-t border-gray-800 pt-8 text-center text-gray-500">
                <p>© 2023 CodeMaster. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>
<style>
        .sparkle {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle 2s infinite;
        }

        @keyframes sparkle {
            0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
            100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
        }



</style>