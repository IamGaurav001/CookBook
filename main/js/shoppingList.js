// Main event listener that runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // User menu toggle functionality
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');

    if (userMenuButton) {
        userMenuButton.addEventListener('click', function() {
            userMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }
    
    // Add item modal functionality
    const addItemBtn = document.getElementById('add-item-btn');
    const emptyAddItemBtn = document.getElementById('empty-add-item-btn');
    const addItemModal = document.getElementById('add-item-modal');
    const closeAddModal = document.getElementById('close-add-modal');
    const cancelAddItem = document.getElementById('cancel-add-item');
    const addItemForm = document.getElementById('add-item-form');
    
    function showAddItemModal() {
        addItemModal.classList.remove('hidden');
        document.getElementById('item-name').focus();
    }
    
    function hideAddItemModal() {
        addItemModal.classList.add('hidden');
        addItemForm.reset();
    }
    
    if (addItemBtn) {
        addItemBtn.addEventListener('click', showAddItemModal);
    }
    
    if (emptyAddItemBtn) {
        emptyAddItemBtn.addEventListener('click', showAddItemModal);
    }
    
    if (closeAddModal) {
        closeAddModal.addEventListener('click', hideAddItemModal);
    }
    
    if (cancelAddItem) {
        cancelAddItem.addEventListener('click', hideAddItemModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addItemModal) {
            addItemModal.classList.add('hidden');
        }
    });
    
    // Item checkbox functionality
    const shoppingListContainer = document.getElementById('shopping-list-container');
    if (shoppingListContainer) {
        shoppingListContainer.addEventListener('change', function(e) {
            if (e.target.matches('.item-checkbox')) {
                const itemElement = e.target.closest('.shopping-item');
                const itemId = itemElement.dataset.itemId;
                const completed = e.target.checked ? 1 : 0;
                
                // Show loading state
                itemElement.style.opacity = '0.5';
                e.target.disabled = true;
                
                fetch(window.location.href, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `update_item=1&item_id=${itemId}&completed=${completed}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update UI
                        itemElement.classList.toggle('completed', completed);
                        
                        // Update counters
                        updateCounters();
                        
                        // Show success toast
                        showToast('Success', 'Item updated successfully', 'success');
                    } else {
                        // Revert checkbox state
                        e.target.checked = !e.target.checked;
                        showToast('Error', data.message || 'Failed to update item', 'error');
                        console.error('Update failed:', data.message);
                    }
                })
                .catch(error => {
                    // Revert checkbox state
                    e.target.checked = !e.target.checked;
                    showToast('Error', 'Failed to update item', 'error');
                    console.error('Update error:', error);
                })
                .finally(() => {
                    // Remove loading state
                    itemElement.style.opacity = '1';
                    e.target.disabled = false;
                });
            }
        });
        
        // Handle delete buttons
        shoppingListContainer.addEventListener('click', function(e) {
            if (e.target.closest('.delete-item')) {
                const itemElement = e.target.closest('.shopping-item');
                const itemId = itemElement.dataset.itemId;
                
                if (confirm('Are you sure you want to delete this item?')) {
                    // Show loading state
                    itemElement.style.opacity = '0.5';
                    
                    fetch(window.location.href, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `delete_item=1&item_id=${itemId}`
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            itemElement.remove();
                            updateCounters();
                            showToast('Success', 'Item deleted successfully', 'success');
                            
                            // Check if list is empty
                            const remainingItems = document.querySelectorAll('.shopping-item');
                            if (remainingItems.length === 0) {
                                showEmptyState();
                            }
                        } else {
                            showToast('Error', data.message || 'Failed to delete item', 'error');
                            itemElement.style.opacity = '1';
                        }
                    })
                    .catch(error => {
                        showToast('Error', 'Failed to delete item', 'error');
                        itemElement.style.opacity = '1';
                        console.error('Delete error:', error);
                    });
                }
            }
        });
    }
    
    // Update item counters
    function updateCounters() {
        const totalItems = document.querySelectorAll('.shopping-item').length;
        const completedItems = document.querySelectorAll('.shopping-item.completed').length;
        const remainingItems = totalItems - completedItems;
        
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('completed-items').textContent = completedItems;
        document.getElementById('remaining-items').textContent = remainingItems;
        document.getElementById('list-stats').textContent = `Showing ${totalItems} items`;
    }
    
    // Toast notification functionality
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    const closeToast = document.getElementById('close-toast');
    
    function showToast(title, message, type = 'success') {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Update icon based on type
        if (type === 'success') {
            toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            toastIcon.className = 'flex-shrink-0 w-6 h-6 mr-3 text-green-500';
        } else {
            toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            toastIcon.className = 'flex-shrink-0 w-6 h-6 mr-3 text-red-500';
        }

        toast.classList.add('toast-slide-in');
        toast.classList.remove('translate-x-full');

        // Auto hide after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    }
    
    function hideToast() {
        toast.classList.add('toast-slide-out');
        setTimeout(() => {
            toast.classList.remove('toast-slide-in', 'toast-slide-out');
            toast.classList.add('translate-x-full');
        }, 300);
    }
    
    if (closeToast) {
        closeToast.addEventListener('click', hideToast);
    }
    
    // Show empty state function
    function showEmptyState() {
        const emptyState = `
            <div id="empty-state" class="p-8 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-opacity-20 mb-4">
                    <i class="fas fa-shopping-basket text-2xl text-gray-500"></i>
                </div>
                <h3 class="text-lg font-medium text-black mb-2">Your shopping list is empty</h3>
                <p class="text-text mb-4">Add items to your shopping list to get started</p>
                <button id="empty-add-item-btn" class="bg-black hover:bg-yellow-400 text-white hover:text-black font-medium py-2 px-4 rounded-lg shadow-sm cursor-pointer">
                    Add Your First Item
                </button>
            </div>
        `;
        shoppingListContainer.innerHTML = emptyState;
        
        // Reattach event listener to new button
        document.getElementById('empty-add-item-btn').addEventListener('click', showAddItemModal);
    }
});